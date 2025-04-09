package com.fe

import android.content.Context
import android.graphics.*
import android.util.Log
import org.tensorflow.lite.Interpreter
import java.io.File
import java.io.FileOutputStream
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel
import kotlin.math.max
import kotlin.math.min

// --- 데이터 클래스 정의 (Top 5 필드 추가됨) ---
data class DetectionResult(
    val className: String, // 가장 높은 확률의 클래스 이름
    val score: Float,      // 가장 높은 확률 값
    val box: RectF,        // 원본 이미지 기준 좌표
    val top5Probabilities: List<Pair<String, Float>> // <클래스명, 확률> 쌍의 리스트 추가
)

data class PreprocessResult(
    val bitmap: Bitmap, // 전처리된 비트맵 (640x640)
    val scale: Float,   // 원본 -> 640 스케일 비율
    val padX: Float,    // x축 패딩 크기
    val padY: Float     // y축 패딩 크기
)

// --- ModelHelper 클래스 정의 ---
class ModelHelper(private val context: Context) {
    private lateinit var interpreter: Interpreter
    private var labels: List<String> = emptyList() // 초기화
    private val inputSize = 640
    // confidenceThreshold는 필요에 따라 조정 가능 (예: 0.3f 또는 0.5f)
    private val confidenceThreshold = 0.25f // 최종 결과 필터링용 임계값
    private var numClasses: Int = 0
    private var outputShape: IntArray = intArrayOf()

    // NMS 관련 설정 (필요에 따라 조정)
    private val iouThreshold = 0.45f // IoU 임계값 (NMS용)

    init {
        try {
            val options = Interpreter.Options().apply {
                setNumThreads(4) // 스레드 수는 기기에 따라 조절
            }
            val modelBuffer = loadModelFile("best_float16.tflite")
            interpreter = Interpreter(modelBuffer, options)

            val inputTensor = interpreter.getInputTensor(0)
            val outputTensor = interpreter.getOutputTensor(0)
            outputShape = outputTensor.shape() // 예: [1, 28, 8400]

            Log.d("ModelInit", "입력 텐서 정보: ${inputTensor.shape().contentToString()}, ${inputTensor.dataType()}")
            Log.d("ModelInit", "출력 텐서 정보: ${outputShape.contentToString()}, ${outputTensor.dataType()}")

            // 클래스 수 계산
            if (outputShape.size == 3 && outputShape[0] == 1 && outputShape[1] > 4) {
                // 채널 수 = 좌표(4) + 클래스 수(N)
                numClasses = outputShape[1] - 4
                Log.d("ModelInit", "감지된 클래스 수 (채널 기준): $numClasses")
            } else {
                Log.e("ModelInit", "예상치 못한 모델 출력 형태: ${outputShape.contentToString()}. [1, N, 8400] (N>4) 형태가 필요합니다.")
                numClasses = 0 // 오류 상황 표시
            }

            labels = loadLabels("labels.txt") // 라벨 파일 로드

            // 클래스 수 및 라벨 검증
            if (numClasses > 0) {
                if (labels.isNotEmpty() && labels.size != numClasses) {
                    Log.w("ModelInit", "경고: 라벨 파일 클래스 수(${labels.size}) != 모델 출력 클래스 수($numClasses). 모델 기준($numClasses)을 사용합니다.")
                } else if (labels.isEmpty()) {
                    Log.w("ModelInit", "경고: 라벨 파일이 비어있습니다. 'class_0', 'class_1'... 형식의 기본 라벨을 생성합니다.")
                    labels = List(numClasses) { "class_$it" } // 기본 라벨 생성
                }
            } else {
                if (labels.isNotEmpty()) {
                    Log.w("ModelInit", "경고: 모델 클래스 수를 계산하지 못했지만 라벨 파일은 존재합니다. 라벨 파일 기준(${labels.size})으로 설정합니다.")
                    numClasses = labels.size
                } else {
                    Log.e("ModelInit", "오류: 모델 클래스 수 계산 실패 및 라벨 파일 없음/비어있음. 객체 탐지를 진행할 수 없습니다.")
                    throw RuntimeException("객체 탐지를 위한 클래스 정보를 얻을 수 없습니다.")
                }
            }

            // 최종 사용될 라벨 수와 클래스 수 확인
            if (labels.size != numClasses) {
                 Log.w("ModelInit", "최종 라벨 수(${labels.size})와 클래스 수(${numClasses})가 일치하지 않습니다. 라벨 파일 또는 모델 확인 필요.")
                 // 필요시 numClasses를 labels.size에 맞추거나 에러 처리
                 // numClasses = labels.size
            }

            Log.d("ModelInit", "✅ 모델과 라벨 파일 로드 완료: ${labels.size}개의 라벨, ${numClasses}개의 클래스 사용")

        } catch (e: Exception) {
            Log.e("ModelInit", "모델 초기화 중 심각한 오류 발생", e)
            throw RuntimeException("ModelHelper 초기화 실패", e)
        }
    }

    private fun loadModelFile(filename: String): MappedByteBuffer {
        val fileDescriptor = context.assets.openFd(filename)
        val inputStream = FileInputStream(fileDescriptor.fileDescriptor)
        val fileChannel = inputStream.channel
        val startOffset = fileDescriptor.startOffset
        val declaredLength = fileDescriptor.declaredLength
        val mappedByteBuffer = fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength)
        // 리소스 닫기
        fileChannel.close()
        inputStream.close()
        fileDescriptor.close()
        return mappedByteBuffer
    }

    private fun loadLabels(filename: String): List<String> {
        return try {
            context.assets.open(filename).bufferedReader().useLines { lines ->
                lines.map { it.trim() }.filter { it.isNotEmpty() }.toList()
            }
        } catch (e: IOException) {
            Log.e("ModelHelper", "라벨 파일 로드 실패: $filename", e)
            emptyList() // 오류 발생 시 빈 리스트 반환
        }
    }

    private fun preprocessImage(bitmap: Bitmap): PreprocessResult {
        val originalWidth = bitmap.width
        val originalHeight = bitmap.height
        val scaleW = inputSize.toFloat() / originalWidth
        val scaleH = inputSize.toFloat() / originalHeight
        val scale = minOf(scaleW, scaleH) // 비율 유지를 위해 작은 스케일 사용
        val scaledWidth = (originalWidth * scale).toInt()
        val scaledHeight = (originalHeight * scale).toInt()

        val scaledBitmap = Bitmap.createScaledBitmap(bitmap, scaledWidth, scaledHeight, true)
        val paddedBitmap = Bitmap.createBitmap(inputSize, inputSize, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(paddedBitmap)
        canvas.drawColor(Color.BLACK) // 검은색으로 채우기

        val padX = ((inputSize - scaledWidth) / 2f)
        val padY = ((inputSize - scaledHeight) / 2f)
        canvas.drawBitmap(scaledBitmap, padX, padY, null)

        if (scaledBitmap != paddedBitmap && !scaledBitmap.isRecycled) {
             scaledBitmap.recycle()
             // Log.d("ModelHelper", "Scaled Bitmap 리소스 해제") // 필요시 로그 활성화
        }
        return PreprocessResult(paddedBitmap, scale, padX, padY)
    }

    private fun convertBitmapToByteBuffer(bitmap: Bitmap): ByteBuffer {
        val byteBuffer = ByteBuffer.allocateDirect(1 * inputSize * inputSize * 3 * 4)
        byteBuffer.order(ByteOrder.nativeOrder())
        byteBuffer.rewind()

        val intValues = IntArray(inputSize * inputSize)
        if (!bitmap.isRecycled) {
            bitmap.getPixels(intValues, 0, inputSize, 0, 0, inputSize, inputSize)
        } else {
            Log.e("ModelHelper", "convertBitmapToByteBuffer: Bitmap이 이미 recycle됨")
            return byteBuffer
        }

        for (pixelValue in intValues) {
            byteBuffer.putFloat(((pixelValue shr 16) and 0xFF) / 255.0f) // R
            byteBuffer.putFloat(((pixelValue shr 8) and 0xFF) / 255.0f)  // G
            byteBuffer.putFloat((pixelValue and 0xFF) / 255.0f)         // B
        }
        byteBuffer.rewind()
        return byteBuffer
    }

    // --- 객체 감지 함수 ---
    fun detectObjects(input: Bitmap): List<DetectionResult> {
        // 초기화 및 유효성 검사
        if (!::interpreter.isInitialized) {
            Log.e("ModelHelper", "detectObjects: Interpreter가 초기화되지 않았습니다.")
            return emptyList()
        }
        if (input.isRecycled) {
            Log.e("ModelHelper", "detectObjects: 입력 Bitmap이 이미 recycle됨")
            return emptyList()
        }
        if (numClasses <= 0 || labels.isEmpty()) {
            Log.e("ModelHelper", "detectObjects: 유효한 클래스 수($numClasses) 또는 라벨(${labels.size})이 없어 결과 처리 불가.")
            return emptyList()
        }

        Log.d("ModelDebug", "🚀 객체 감지 시작 (원본 크기: ${input.width}x${input.height})")

        var preprocessedBitmap: Bitmap? = null
        try {
            // 1. 이미지 전처리
            val preprocessResult = preprocessImage(input)
            preprocessedBitmap = preprocessResult.bitmap

            // 디버깅용 이미지 저장 (필요시 주석 해제)
            // if (preprocessedBitmap != null && !preprocessedBitmap.isRecycled) {
            //     saveBitmapToFile(preprocessedBitmap, "preprocessed_input.png")
            // }

            val inputBuffer = convertBitmapToByteBuffer(preprocessedBitmap)

            // 2. 모델 출력 버퍼 준비
            val outputBuffer = Array(outputShape[0]) { Array(outputShape[1]) { FloatArray(outputShape[2]) } }

            // 3. 모델 추론 실행
            Log.d("ModelDebug", "🧠 모델 추론 실행...")
            val startTime = System.currentTimeMillis()
            interpreter.run(inputBuffer, outputBuffer)
            val endTime = System.currentTimeMillis()
            Log.d("ModelDebug", "⏱️ 추론 시간: ${endTime - startTime} ms")


            // --- 모델 원본 확률 값 로깅 (선택적) ---
            val numAnchors = outputShape[2] // 8400
            val rawLoggingThreshold = 0.05f
            var loggedRawCount = 0
            val maxRawLogsToShow = 30 // 로그 출력 개수 제한

            Log.d("RawProbLog", "--------- 모델 원본 확률 값 (상세) 시작 (Threshold: $rawLoggingThreshold) ---------")
            Log.d("RawProbLog", "총 Anchor 수: $numAnchors, 사용 클래스 수: $numClasses")

            for (i in 0 until numAnchors) {
                val classScores = FloatArray(numClasses)
                var bestClassScore = 0f
                for (c in 0 until numClasses) {
                    val score = outputBuffer[0][4 + c][i]
                    classScores[c] = score
                    if (score > bestClassScore) {
                        bestClassScore = score
                    }
                }

                if (bestClassScore > rawLoggingThreshold && loggedRawCount < maxRawLogsToShow) {
                    loggedRawCount++
                    val cxNorm = outputBuffer[0][0][i]
                    val cyNorm = outputBuffer[0][1][i]
                    val wNorm = outputBuffer[0][2][i]
                    val hNorm = outputBuffer[0][3][i]
                    val boxStr = "Box(cxN,cyN,wN,hN)=[%.2f, %.2f, %.2f, %.2f]".format(cxNorm, cyNorm, wNorm, hNorm)

                    val topClassScoresStr = classScores.indices
                        .map { index -> Pair(index, classScores[index]) }
                        .sortedByDescending { it.second }
                        .take(5)
                        .joinToString { (idx, score) ->
                            val className = if (idx < labels.size) labels[idx] else "unknown_$idx"
                            "$className: ${"%.4f".format(score)}"
                        }
                    Log.d("RawProbLog", "  Anchor $i: $boxStr")
                    Log.d("RawProbLog", "    -> Top 5 Probabilities: [ $topClassScoresStr ]")
                }
            }
            if (loggedRawCount == 0) { Log.d("RawProbLog", "  (임계값 ${rawLoggingThreshold} 이상인 후보 Anchor 없음)") }
            else if (loggedRawCount >= maxRawLogsToShow) { Log.d("RawProbLog", "  (로그 최대 ${maxRawLogsToShow}개 도달)") }
            Log.d("RawProbLog", "--------- 모델 원본 확률 값 (상세) 끝 ---------")
            // --- 모델 원본 확률 값 로깅 끝 ---


            // --- 결과 처리 로직 시작 ---
            val detections = mutableListOf<DetectionResult>() // NMS 전 모든 후보 탐지 결과

            // 각 예측 위치(anchor)에 대해 반복
            for (i in 0 until numAnchors) {
                // 최고 클래스 점수 및 인덱스 찾기
                var bestClassScore = 0f
                var bestClassIndex = -1
                // --- 모든 클래스 점수 저장 (Top 5 계산용) ---
                val allClassScores = mutableListOf<Pair<Int, Float>>()
                for (c in 0 until numClasses) {
                    val classScore = outputBuffer[0][4 + c][i]
                    allClassScores.add(Pair(c, classScore)) // 모든 점수 저장
                    if (classScore > bestClassScore) {
                        bestClassScore = classScore
                        bestClassIndex = c
                    }
                }
                // --- 모든 클래스 점수 저장 끝 ---

                // 1차 관문: 신뢰도 필터링
                val confidence = bestClassScore
                if (confidence > confidenceThreshold && bestClassIndex != -1) {
                    // 클래스 이름 가져오기
                    val className = if (bestClassIndex < labels.size) labels[bestClassIndex] else "unknown_$bestClassIndex"

                    // 좌표 변환 로직
                    val cxNorm = outputBuffer[0][0][i]
                    val cyNorm = outputBuffer[0][1][i]
                    val wNorm = outputBuffer[0][2][i]
                    val hNorm = outputBuffer[0][3][i]
                    val cxPixel = cxNorm * inputSize
                    val cyPixel = cyNorm * inputSize
                    val wPixel = wNorm * inputSize
                    val hPixel = hNorm * inputSize
                    val scale = preprocessResult.scale
                    val padX = preprocessResult.padX
                    val padY = preprocessResult.padY
                    val originalCenterX = (cxPixel - padX) / scale
                    val originalCenterY = (cyPixel - padY) / scale
                    val originalWidth = wPixel / scale
                    val originalHeight = hPixel / scale
                    val xmin = max(0f, originalCenterX - originalWidth / 2)
                    val ymin = max(0f, originalCenterY - originalHeight / 2)
                    val xmax = min(input.width.toFloat(), originalCenterX + originalWidth / 2)
                    val ymax = min(input.height.toFloat(), originalCenterY + originalHeight / 2)

                    // 2차 관문: 유효한 박스인지 확인
                    if (xmax > xmin && ymax > ymin) {
                        val box = RectF(xmin, ymin, xmax, ymax)

                        // --- Top 5 확률 계산 ---
                        val top5Probabilities = allClassScores
                            .sortedByDescending { it.second } // 점수 기준 내림차순 정렬
                            .take(5) // 상위 5개 선택
                            .map { (idx, score) ->
                                val name = if (idx < labels.size) labels[idx] else "unknown_$idx"
                                Pair(name, score) // (클래스 이름, 점수) 쌍으로 변환
                            }
                        // --- Top 5 확률 계산 끝 ---

                        // 결과 추가 (Top 5 정보 포함)
                        detections.add(
                            DetectionResult(
                                className = className,
                                score = confidence,
                                box = box,
                                top5Probabilities = top5Probabilities // 계산된 Top 5 정보 추가
                            )
                        )
                    } else {
                         Log.w("ModelDebug", "유효하지 않은 박스 생성됨 (i=$i): [$xmin, $ymin, $xmax, $ymax] <- 변환 후 좌표")
                    }
                } // 1차 관문(신뢰도) 끝
            } // anchor 루프 끝
            Log.d("ModelDebug", "📊 신뢰도 필터링(${confidenceThreshold}) 후 후보 수: ${detections.size}")

            // 7. NMS 적용
            val finalDetections = applyNMS(detections) // DetectionResult 구조 변경되었지만 NMS는 score, box만 사용

            // 최종 결과 로깅 (Top 5 정보 포함)
            Log.d("ModelOutput", "✅ 최종 감지된 클래스 수 (NMS 적용 후): ${finalDetections.size}")
            Log.d("ModelOutput", "--------- 최종 탐지 객체 Top 5 확률 값 ---------")
            if (finalDetections.isEmpty()) {
                Log.d("ModelOutput", "  (탐지된 객체 없음)")
            } else {
                finalDetections.forEachIndexed { index, res -> // res 타입은 이제 top5Probabilities를 포함
                    val topClassInfo = "Top Class: '${res.className}' (Score: ${"%.4f".format(res.score)})"
                    // Top 5 정보를 문자열로 만들기
                    val top5Str = res.top5Probabilities.joinToString { (name, score) ->
                        "'${name}': ${"%.4f".format(score)}"
                    }
                    Log.d("ModelOutput", "  [${index + 1}] $topClassInfo")
                    Log.d("ModelOutput", "      Top 5: [ $top5Str ]")
                    // Log.d("ModelOutput", "      Box: ${res.box}") // 필요시 박스 정보 로깅
                }
            }
            Log.d("ModelOutput", "---------------------------------------------")


            return finalDetections // NMS 적용된 최종 결과 반환

        } catch (e: Exception) {
            Log.e("ModelHelper", "객체 감지 중 오류 발생", e)
            return emptyList() // 오류 발생 시 빈 리스트 반환
        } finally {
            // 전처리된 비트맵 리소스 해제
            if (preprocessedBitmap != null && !preprocessedBitmap.isRecycled) {
                preprocessedBitmap.recycle()
                // Log.d("ModelDebug", "Preprocessed Bitmap 리소스 해제") // 필요시 로그 활성화
            }
        }
    } // detectObjects 함수 끝

    // --- NMS 함수 ---
    private fun applyNMS(detections: List<DetectionResult>): List<DetectionResult> {
        if (detections.isEmpty()) {
            return emptyList()
        }
        // NMS는 score와 box 필드만 사용하므로 DetectionResult 구조 변경에 영향받지 않음
        val sortedDetections = detections.sortedByDescending { it.score }
        val selectedDetections = mutableListOf<DetectionResult>()
        val active = BooleanArray(sortedDetections.size) { true }
        var numActive = active.size

        for (i in sortedDetections.indices) {
            if (active[i]) {
                val det1 = sortedDetections[i]
                selectedDetections.add(det1) // top5Probabilities 정보도 함께 유지됨
                active[i] = false
                numActive--

                if (numActive == 0) break

                for (j in (i + 1) until sortedDetections.size) {
                    if (active[j]) {
                        val det2 = sortedDetections[j]
                        val iou = calculateIoU(det1.box, det2.box)
                        if (iou > iouThreshold) {
                            active[j] = false
                            numActive--
                        }
                    }
                }
            }
        }
        return selectedDetections
    }

    // --- IoU 계산 함수 ---
    private fun calculateIoU(box1: RectF, box2: RectF): Float {
        val xA = max(box1.left, box2.left)
        val yA = max(box1.top, box2.top)
        val xB = min(box1.right, box2.right)
        val yB = min(box1.bottom, box2.bottom)
        val intersectionArea = max(0f, xB - xA) * max(0f, yB - yA)
        val box1Area = box1.width() * box1.height()
        val box2Area = box2.width() * box2.height()
        val unionArea = box1Area + box2Area - intersectionArea
        return if (unionArea <= 0f) 0f else intersectionArea / unionArea
    }

    // 비트맵을 파일로 저장하는 함수 (디버깅용)
    private fun saveBitmapToFile(bitmap: Bitmap, filename: String) {
        val cacheDir = context.cacheDir
        val file = File(cacheDir, filename)
        Log.d("SaveBitmap", "전처리된 이미지 저장 시도: ${file.absolutePath}")
        try {
            FileOutputStream(file).use { out ->
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
                out.flush()
                Log.d("SaveBitmap", "✅ 전처리된 이미지 저장 성공: ${file.absolutePath}")
            }
        } catch (e: IOException) {
            Log.e("SaveBitmap", "❌ 전처리된 이미지 저장 실패", e)
        }
    }

    // Interpreter 리소스 해제 함수
    fun close() {
        if (::interpreter.isInitialized) {
            interpreter.close()
            Log.d("ModelHelper", "✅ Interpreter 리소스 해제 완료.")
        } else {
            Log.w("ModelHelper", "Interpreter가 초기화되지 않아 close()를 호출할 수 없습니다.")
        }
    }

} // ModelHelper 클래스 끝