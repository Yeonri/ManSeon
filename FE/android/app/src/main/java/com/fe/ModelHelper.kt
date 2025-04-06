package com.fe

import android.content.Context
import android.graphics.*
import android.util.Log
import org.tensorflow.lite.Interpreter
import java.io.FileInputStream
import java.io.InputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel

data class DetectionResult(
    val className: String,
    val score: Float,
    val box: RectF
)

class ModelHelper(private val context: Context) {
    private val interpreter: Interpreter
    private val labels: List<String>
    private val confidenceThreshold = 0.4f

    init {
        interpreter = Interpreter(loadModelFile("best_float16.tflite"))
        labels = loadLabels("labels.txt")
        Log.d("ModelInit", "✅ 모델과 라벨 파일 로드 완료: ${labels.size}개의 클래스")
    }

    private fun loadModelFile(filename: String): MappedByteBuffer {
        val fileDescriptor = context.assets.openFd(filename)
        val inputStream = FileInputStream(fileDescriptor.fileDescriptor)
        val fileChannel = inputStream.channel
        return fileChannel.map(
            FileChannel.MapMode.READ_ONLY,
            fileDescriptor.startOffset,
            fileDescriptor.declaredLength
        )
    }

    private fun loadLabels(filename: String): List<String> {
        val inputStream: InputStream = context.assets.open(filename)
        return inputStream.bufferedReader().readLines()
    }

    private fun preprocessImage(bitmap: Bitmap, targetSize: Int = 640): Bitmap {
        val width = bitmap.width
        val height = bitmap.height

        val scale = targetSize.toFloat() / maxOf(width, height)
        val scaledWidth = (width * scale).toInt()
        val scaledHeight = (height * scale).toInt()

        val scaledBitmap = Bitmap.createScaledBitmap(bitmap, scaledWidth, scaledHeight, true)

        val output = Bitmap.createBitmap(targetSize, targetSize, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(output)
        canvas.drawColor(Color.WHITE)
        val left = ((targetSize - scaledWidth) / 2).toFloat()
        val top = ((targetSize - scaledHeight) / 2).toFloat()
        canvas.drawBitmap(scaledBitmap, left, top, null)

        return output
    }

    private fun convertBitmapToByteBuffer(bitmap: Bitmap): ByteBuffer {
        val byteBuffer = ByteBuffer.allocateDirect(1 * 640 * 640 * 3 * 4)
        byteBuffer.order(ByteOrder.nativeOrder())

        for (y in 0 until 640) {
            for (x in 0 until 640) {
                val pixel = bitmap.getPixel(x, y)
                val r = ((pixel shr 16) and 0xFF) / 255.0f
                val g = ((pixel shr 8) and 0xFF) / 255.0f
                val b = (pixel and 0xFF) / 255.0f
                byteBuffer.putFloat(r)
                byteBuffer.putFloat(g)
                byteBuffer.putFloat(b)
            }
        }

        return byteBuffer
    }

    fun classifyRawBitmap(input: Bitmap): List<DetectionResult> {
        Log.d("ModelDebug", "🚀 classifyRawBitmap 시작")

        val preprocessed = preprocessImage(input)
        val inputBuffer = convertBitmapToByteBuffer(preprocessed)

        val outputBuffer = Array(1) { Array(28) { FloatArray(8400) } }
        interpreter.run(inputBuffer, outputBuffer)

        Log.d(
            "ModelDebug",
            "📦 Output shape 확인: [${outputBuffer.size}, ${outputBuffer[0].size}, ${outputBuffer[0][0].size}]"
        )

        val results = mutableListOf<DetectionResult>()
        val maxClasses = 28 - 5 // 5 이후부터 class scores

        for (i in 0 until 8400) {
            val cx = outputBuffer[0][0][i]
            val cy = outputBuffer[0][1][i]
            val w = outputBuffer[0][2][i]
            val h = outputBuffer[0][3][i]
            val objectness = outputBuffer[0][4][i]

            val classScores = (0 until minOf(labels.size, maxClasses)).map { classIdx ->
                outputBuffer[0][5 + classIdx][i]
            }.toFloatArray()

            val classIndex = classScores.indices.maxByOrNull { classScores[it] } ?: continue
            val classScore = classScores[classIndex]
            val finalScore = objectness * classScore

            Log.d(
                "ScoreDebug",
                "anchor=$i, objectness=$objectness, bestClassIndex=$classIndex, classScore=$classScore, finalScore=$finalScore"
            )

            if (finalScore >= confidenceThreshold) {
                val rect = RectF(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
                val label = labels.getOrElse(classIndex) { "unknown" }
                results.add(DetectionResult(label, finalScore, rect))
            }
        }

        Log.d("ModelOutput", "✅ 감지된 객체 수: ${results.size}")

        val topResults = results.sortedByDescending { it.score }.take(5)

        topResults.forEachIndexed { index, res ->
            Log.d(
                "ModelOutput",
                "Top ${index + 1}: class=${res.className}, score=${res.score}, box=${res.box}"
            )
        }

        return topResults
    }
}
