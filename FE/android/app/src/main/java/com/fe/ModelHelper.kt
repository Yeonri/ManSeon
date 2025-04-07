package com.fe

import android.content.Context
import android.graphics.*
import android.util.Log
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.gpu.CompatibilityList
import org.tensorflow.lite.gpu.GpuDelegate
import java.io.FileInputStream
import java.io.InputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel
import kotlin.math.exp
import kotlin.math.max

data class DetectionResult(
    val className: String,
    val score: Float,
    val box: RectF
)

class ModelHelper(private val context: Context) {
    private val interpreter: Interpreter
    private val labels: List<String>
    private val inputSize = 640 // YOLO 모델 입력 크기
    private val confidenceThreshold = 0.3f // 신뢰도 임계값 하향 조정
    private val iouThreshold = 0.45f // NMS IOU 임계값

    init {
        val options = Interpreter.Options().apply {
            setNumThreads(4)

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                setUseNNAPI(true)  // ✅ NNAPI 자동 활성화
                Log.d("ModelInit", "NNAPI 사용 활성화됨")
            } else {
                Log.d("ModelInit", "Android 9.0 미만: CPU 모드 사용")
            }
        }

        interpreter = Interpreter(loadModelFile("best_float16.tflite"), options)

        // 모델 입출력 정보 로깅
        val inputTensor = interpreter.getInputTensor(0)
        val outputTensor = interpreter.getOutputTensor(0)
        Log.d("ModelInit", "입력 텐서 정보: ${inputTensor.shape().contentToString()}, ${inputTensor.dataType()}")
        Log.d("ModelInit", "출력 텐서 정보: ${outputTensor.shape().contentToString()}, ${outputTensor.dataType()}")

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

    // 타입 수정: 함수의 반환 타입을 실제 반환 값 구조와 일치시킴
    private fun preprocessImage(bitmap: Bitmap): Pair<Bitmap, Pair<Float, Pair<Float, Float>>> {
        val originalWidth = bitmap.width
        val originalHeight = bitmap.height
        
        // 원본 이미지 비율을 고려한 스케일링
        val scaleW = inputSize.toFloat() / originalWidth
        val scaleH = inputSize.toFloat() / originalHeight
        val scale = minOf(scaleW, scaleH)
        
        val scaledWidth = (originalWidth * scale).toInt()
        val scaledHeight = (originalHeight * scale).toInt()
        
        // 비율을 유지하면서 스케일링
        val scaledBitmap = Bitmap.createScaledBitmap(bitmap, scaledWidth, scaledHeight, true)
        
        // 패딩을 적용하여 정사각형 이미지 생성
        val paddedBitmap = Bitmap.createBitmap(inputSize, inputSize, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(paddedBitmap)
        canvas.drawColor(Color.BLACK) // 패딩 영역을 검은색으로 설정 (YOLO 모델 훈련 시 일반적으로 사용)
        
        // 이미지를 중앙에 배치
        val left = ((inputSize - scaledWidth) / 2).toFloat()
        val top = ((inputSize - scaledHeight) / 2).toFloat()
        canvas.drawBitmap(scaledBitmap, left, top, null)
        
        // 스케일 비율과 오프셋 정보 반환 (바운딩 박스 매핑용)
        return Pair(paddedBitmap, Pair(scale, Pair(left, top)))
    }

    private fun convertBitmapToByteBuffer(bitmap: Bitmap): ByteBuffer {
        // 입력 크기에 맞는 ByteBuffer 할당 (float32 포맷 = 4바이트)
        val byteBuffer = ByteBuffer.allocateDirect(1 * inputSize * inputSize * 3 * 4)
        byteBuffer.order(ByteOrder.nativeOrder())
        byteBuffer.rewind()
        
        val intValues = IntArray(inputSize * inputSize)
        bitmap.getPixels(intValues, 0, inputSize, 0, 0, inputSize, inputSize)
        
        // YOLOv8 모델에 맞게 정규화 (0-1 범위)
        for (i in 0 until inputSize * inputSize) {
            val pixel = intValues[i]
            // RGB 채널 순서 (일반적인 YOLO 모델에 맞춤)
            byteBuffer.putFloat(((pixel shr 16) and 0xFF) / 255.0f)
            byteBuffer.putFloat(((pixel shr 8) and 0xFF) / 255.0f)
            byteBuffer.putFloat((pixel and 0xFF) / 255.0f)
        }
        
        return byteBuffer
    }

    fun classifyRawBitmap(input: Bitmap): List<DetectionResult> {
        Log.d("ModelDebug", "🚀 classifyRawBitmap 시작: ${input.width}x${input.height}")
        
        // 이미지 전처리 및 스케일링 정보 획득
        val (preprocessed, scalingInfo) = preprocessImage(input)
        val (scale, offsetPair) = scalingInfo
        // 비구조화 수정: Pair에서 각 요소를 올바르게 추출
        val offsetX = offsetPair.first
        val offsetY = offsetPair.second
        
        val inputBuffer = convertBitmapToByteBuffer(preprocessed)
        
        // 모델 출력 텐서의 형태 확인 (일반적인 YOLOv8 출력은 [1, 84, 8400])
        val outputTensor = interpreter.getOutputTensor(0)
        val outputShape = outputTensor.shape()
        
        Log.d("ModelDebug", "📊 모델 출력 형태: ${outputShape.contentToString()}")
        
        // 출력 버퍼 동적 할당
        val numClasses = labels.size
        val outputSize = 4 + 1 + numClasses // xywh + objectness + classes
        
        // YOLOv8 출력 형식에 맞게 버퍼 설정
        // 출력 형식: [1, 84, 8400] or [1, 8400, 84] (모델에 따라 다름)
        val isFirstDimClasses = outputShape[1] == outputSize
        
        val outputBuffer: Array<Array<FloatArray>>
        
        if (isFirstDimClasses) {
            // [1, 84, 8400] 형식
            outputBuffer = Array(1) { Array(outputSize) { FloatArray(outputShape[2]) } }
        } else {
            // [1, 8400, 84] 형식
            outputBuffer = Array(1) { Array(outputShape[1]) { FloatArray(outputSize) } }
        }
        
        // 모델 추론 실행
        interpreter.run(inputBuffer, outputBuffer)
        
        val detections = mutableListOf<DetectionResult>()
        val numAnchors = if (isFirstDimClasses) outputShape[2] else outputShape[1]
        
        // 출력 결과 파싱
        for (i in 0 until numAnchors) {
            var confidence: Float
            var classIndex: Int
            var x: Float
            var y: Float
            var w: Float
            var h: Float
            
            if (isFirstDimClasses) {
                // [1, 84, 8400] 형식
                x = outputBuffer[0][0][i]
                y = outputBuffer[0][1][i]
                w = outputBuffer[0][2][i]
                h = outputBuffer[0][3][i]
                confidence = outputBuffer[0][4][i]
                
                // 클래스 스코어 중 최대값 찾기
                classIndex = 0
                var maxScore = 0f
                for (c in 0 until numClasses) {
                    val score = outputBuffer[0][5 + c][i]
                    if (score > maxScore) {
                        maxScore = score
                        classIndex = c
                    }
                }
                
                // 최종 신뢰도는 객체 신뢰도와 클래스 신뢰도의 곱
                confidence *= maxScore
            } else {
                // [1, 8400, 84] 형식
                x = outputBuffer[0][i][0]
                y = outputBuffer[0][i][1]
                w = outputBuffer[0][i][2]
                h = outputBuffer[0][i][3]
                confidence = outputBuffer[0][i][4]
                
                classIndex = 0
                var maxScore = 0f
                for (c in 0 until numClasses) {
                    val score = outputBuffer[0][i][5 + c]
                    if (score > maxScore) {
                        maxScore = score
                        classIndex = c
                    }
                }
                
                confidence *= maxScore
            }
            
            // 신뢰도 임계값 필터링
            if (confidence > confidenceThreshold) {
                // 원본 이미지 좌표로 변환 - 나누기 연산 오류 수정
                val originalX = (x - offsetX) / scale
                val originalY = (y - offsetY) / scale
                val originalW = w / scale
                val originalH = h / scale
                
                val rect = RectF(
                    originalX - originalW / 2,
                    originalY - originalH / 2,
                    originalX + originalW / 2,
                    originalY + originalH / 2
                )
                
                // 클래스 이름과 함께 결과 저장
                val className = if (classIndex < labels.size) labels[classIndex] else "unknown"
                detections.add(DetectionResult(className, confidence, rect))
                
                Log.d("Detection", "객체 감지: $className, 신뢰도: $confidence, 위치: $rect")
            }
        }
        
        // NMS(Non-Maximum Suppression) 적용
        val results = applyNMS(detections)
        
        Log.d("ModelOutput", "✅ 감지된 객체 수: ${results.size}")
        results.forEachIndexed { index, res ->
            Log.d(
                "ModelOutput",
                "Top ${index + 1}: class=${res.className}, score=${res.score}, box=${res.box}"
            )
        }
        
        return results
    }
    
    // NMS(Non-Maximum Suppression) 알고리즘 구현
    private fun applyNMS(detections: List<DetectionResult>): List<DetectionResult> {
        // 신뢰도 기준 내림차순 정렬
        val sortedDetections = detections.sortedByDescending { it.score }
        val selectedDetections = mutableListOf<DetectionResult>()
        
        // 선택되지 않은 인덱스를 추적하는 집합
        val remainingIndices = sortedDetections.indices.toMutableSet()
        
        // NMS 로직 수행
        while (remainingIndices.isNotEmpty()) {
            // 가장 높은 신뢰도를 가진 검출 선택
            val maxScoreIndex = remainingIndices.maxByOrNull { sortedDetections[it].score } ?: break
            val maxScoreDetection = sortedDetections[maxScoreIndex]
            
            // 선택된 검출 결과 추가
            selectedDetections.add(maxScoreDetection)
            
            // 선택된 검출은 제거 - minus/plus 모호성 해결
            remainingIndices.remove(maxScoreIndex)
            
            // 높은 IoU를 가진 중복 검출 제거
            val indicesToRemove = mutableListOf<Int>()
            for (i in remainingIndices) {
                val detection = sortedDetections[i]
                val iou = calculateIoU(maxScoreDetection.box, detection.box)
                
                // 같은 클래스이고 IoU가 임계값보다 크면 제거
                if (maxScoreDetection.className == detection.className && iou > iouThreshold) {
                    indicesToRemove.add(i)
                }
            }
            
            // 모호성 해결: 명시적인 removeAll 메소드 사용
            remainingIndices.removeAll(indicesToRemove.toSet())
        }
        
        return selectedDetections
    }
    
    // IoU(Intersection over Union) 계산 함수
    private fun calculateIoU(boxA: RectF, boxB: RectF): Float {
        val intersectionLeft = max(boxA.left, boxB.left)
        val intersectionTop = max(boxA.top, boxB.top)
        val intersectionRight = minOf(boxA.right, boxB.right)
        val intersectionBottom = minOf(boxA.bottom, boxB.bottom)
        
        // 교차 영역 없음
        if (intersectionLeft >= intersectionRight || intersectionTop >= intersectionBottom) {
            return 0f
        }
        
        // 교차 영역 계산
        val intersectionArea = (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop)
        
        // 각 박스 영역 계산
        val boxAArea = boxA.width() * boxA.height()
        val boxBArea = boxB.width() * boxB.height()
        
        // 합집합 영역 계산
        val unionArea = boxAArea + boxBArea - intersectionArea
        
        // IoU 계산
        return intersectionArea / unionArea
    }
}