package com.fe

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import androidx.exifinterface.media.ExifInterface
import android.util.Log
import com.facebook.react.bridge.*
import java.io.File
import java.io.IOException
import java.io.InputStream

class ImageClassifierModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // ModelHelper 인스턴스 생성 (Context 전달, 수정된 ModelHelper 사용)
    private val modelHelper = ModelHelper(reactContext)
    private val TAG = "ImageClassifierModule"

    override fun getName(): String = "ImageClassifier"

    @ReactMethod
    fun classifyImage(imagePath: String, promise: Promise) {
        var bitmap: Bitmap? = null
        try {
            Log.d(TAG, "이미지 분류 시작: $imagePath")

            // 파일 경로 처리
            val path = imagePath.removePrefix("file://")
            val imgFile = File(path)
            if (!imgFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "이미지를 찾을 수 없습니다: $path")
                return
            }

            // 이미지 로드 및 회전 보정
            bitmap = loadAndRotateImage(imgFile.absolutePath)
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "이미지 디코딩 실패: $path")
                return
            }

            Log.d(TAG, "이미지 로드 완료: ${bitmap.width}x${bitmap.height}")

            // 모델 추론 실행 (이제 DetectionResult는 top5Probabilities를 포함)
            val results: List<DetectionResult> = modelHelper.detectObjects(bitmap)

            Log.d(TAG, "############################################")
            Log.d(TAG, "탐지 결과 (NMS 후): ${results.size} 개")
            Log.d(TAG, "############################################")

            // 결과 변환 및 React Native로 전달
            val array = WritableNativeArray()
            for (result in results) { // result 타입은 이제 top5Probabilities를 포함
                val map = Arguments.createMap().apply {
                    // 기존 정보 추가
                    putString("className", result.className) // 최고 확률 클래스
                    putDouble("score", result.score.toDouble()) // 최고 확률 점수
                    putDouble("x", result.box.left.toDouble())
                    putDouble("y", result.box.top.toDouble())
                    putDouble("width", result.box.width().toDouble())
                    putDouble("height", result.box.height().toDouble())

                    // --- 여기!!! Top 5 정보 추가 ---
                    val top5Array = WritableNativeArray()
                    // result.top5Probabilities 리스트를 순회
                    for (topResult in result.top5Probabilities) {
                        // 각 Top 5 항목을 WritableMap으로 변환
                        val topMap = Arguments.createMap().apply {
                            putString("className", topResult.first) // 클래스 이름
                            putDouble("score", topResult.second.toDouble()) // 해당 클래스 점수
                        }
                        top5Array.pushMap(topMap) // 배열에 추가
                    }
                    // 최종 map에 "top5Probabilities" 키로 WritableArray 추가
                    putArray("top5Probabilities", top5Array)
                    // --- Top 5 정보 추가 끝 ---
                }
                array.pushMap(map) // 완성된 map을 최종 배열에 추가
            }

            Log.d(TAG, "분류 완료: ${results.size}개 객체 감지 (React Native로 전달)")
            promise.resolve(array) // 최종 배열을 Promise로 전달

        } catch (e: Exception) {
            Log.e(TAG, "분류 중 오류 발생", e)
            promise.reject("INFERENCE_ERROR", e.message ?: "Unknown error", e)
        } finally {
            // 사용 완료된 비트맵 리소스 해제
            bitmap?.recycle()
            Log.d(TAG, "Bitmap 리소스 해제 시도")
        }
    }

    // 이미지 로드 및 회전 보정 함수
    private fun loadAndRotateImage(path: String): Bitmap? {
        var inputStream: InputStream? = null
        var originalBitmap: Bitmap? = null
        var rotatedBitmap: Bitmap? = null
        try {
            val imageUri = android.net.Uri.parse("file://$path")
            inputStream = reactApplicationContext.contentResolver.openInputStream(imageUri)
            if (inputStream == null) {
                 Log.e(TAG, "InputStream을 열 수 없습니다: $path")
                 return null
            }

            val exifInterface = ExifInterface(inputStream)
            val orientation = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL)

            inputStream.close() // EXIF 읽기 후 닫기
            inputStream = reactApplicationContext.contentResolver.openInputStream(imageUri) // 다시 열기
             if (inputStream == null) {
                 Log.e(TAG, "InputStream을 다시 열 수 없습니다: $path")
                 return null
            }

            val options = BitmapFactory.Options().apply {
                inSampleSize = calculateInSampleSize(imageUri, 1024, 1024) // 샘플 크기 계산
            }
            originalBitmap = BitmapFactory.decodeStream(inputStream, null, options)

            if (originalBitmap == null) {
                Log.e(TAG, "BitmapFactory.decodeStream 실패")
                return null
            }

            val rotationAngle = when (orientation) {
                ExifInterface.ORIENTATION_ROTATE_90 -> 90f
                ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                else -> 0f
            }

            if (rotationAngle == 0f) {
                Log.d(TAG, "이미지 회전 필요 없음")
                rotatedBitmap = originalBitmap
                originalBitmap = null
                return rotatedBitmap
            }

            Log.d(TAG, "이미지 회전 적용: ${rotationAngle}도")
            val matrix = Matrix()
            matrix.postRotate(rotationAngle)

            rotatedBitmap = Bitmap.createBitmap(
                originalBitmap, 0, 0,
                originalBitmap.width, originalBitmap.height,
                matrix, true
            )

            return rotatedBitmap

        } catch (e: IOException) {
            Log.e(TAG, "이미지 로드 또는 회전 중 오류", e)
            return null
        } catch (oom: OutOfMemoryError) {
            Log.e(TAG, "이미지 로드 중 OutOfMemoryError 발생", oom)
            return null
        } finally {
            if (originalBitmap != null && originalBitmap != rotatedBitmap && !originalBitmap.isRecycled) {
                originalBitmap.recycle()
                Log.d(TAG, "원본 Bitmap 리소스 해제 (회전됨)")
            }
            try {
                inputStream?.close()
            } catch (e: IOException) { /* 무시 */ }
        }
    }

    // 적절한 샘플 크기 계산
    private fun calculateInSampleSize(imageUri: android.net.Uri, reqWidth: Int, reqHeight: Int): Int {
         var inputStream: InputStream? = null
         try {
             val options = BitmapFactory.Options().apply {
                 inJustDecodeBounds = true
             }
             inputStream = reactApplicationContext.contentResolver.openInputStream(imageUri)
             if (inputStream == null) return 1

             BitmapFactory.decodeStream(inputStream, null, options)
             inputStream.close() // Bounds 읽은 후 닫기

             val height = options.outHeight
             val width = options.outWidth
             var inSampleSize = 1

             if (height <= 0 || width <= 0) {
                 Log.w(TAG, "inSampleSize 계산 실패: 유효하지 않은 이미지 크기 ($width x $height)")
                 return 1
             }

             if (height > reqHeight || width > reqWidth) {
                 val halfHeight = height / 2
                 val halfWidth = width / 2
                 while ((halfHeight / inSampleSize) >= reqHeight && (halfWidth / inSampleSize) >= reqWidth) {
                     inSampleSize *= 2
                 }
             }
             Log.d(TAG, "계산된 inSampleSize: $inSampleSize (원본: ${width}x${height}, 요청: ${reqWidth}x${reqHeight})")
             return inSampleSize
         } catch (e: Exception) {
             Log.e(TAG, "inSampleSize 계산 중 오류", e)
             return 1
         } finally {
             try {
                 inputStream?.close()
             } catch (e: IOException) { /* 무시 */ }
         }
    }

    // 모듈 정리 시 ModelHelper 리소스 해제
    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        try {
            modelHelper.close()
            Log.d(TAG, "ModelHelper 리소스 해제 완료")
        } catch (e: Exception) {
            Log.e(TAG, "ModelHelper 리소스 해제 중 오류", e)
        }
    }
}