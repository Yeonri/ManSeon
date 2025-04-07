package com.fe

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.media.ExifInterface
import android.util.Log
import com.facebook.react.bridge.*
import java.io.File
import java.io.IOException

class ImageClassifierModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val modelHelper = ModelHelper(reactContext)
    private val TAG = "ImageClassifierModule"

    override fun getName(): String = "ImageClassifier"

    @ReactMethod
    fun classifyImage(imagePath: String, promise: Promise) {
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
            val bitmap = loadAndRotateImage(imgFile.absolutePath)
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "이미지 디코딩 실패: $path")
                return
            }

            Log.d(TAG, "이미지 로드 완료: ${bitmap.width}x${bitmap.height}")

            // 모델 추론 실행
            val results = modelHelper.classifyRawBitmap(bitmap)
            
            // 결과 변환 및 React Native로 전달
            val array = WritableNativeArray()
            for (result in results) {
                val map = Arguments.createMap().apply {
                    putString("className", result.className)
                    putDouble("score", result.score.toDouble())
                    putDouble("x", result.box.left.toDouble())
                    putDouble("y", result.box.top.toDouble())
                    putDouble("width", result.box.width().toDouble())
                    putDouble("height", result.box.height().toDouble())
                }
                array.pushMap(map)
            }

            Log.d(TAG, "분류 완료: ${results.size}개 객체 감지")
            promise.resolve(array)

        } catch (e: Exception) {
            Log.e(TAG, "분류 중 오류 발생", e)
            promise.reject("INFERENCE_ERROR", e.message, e)
        }
    }
    
    // 이미지 로드 및 회전 보정 함수
    private fun loadAndRotateImage(path: String): Bitmap? {
        try {
            // 이미지 메타데이터에서 회전 정보 읽기
            val exifInterface = ExifInterface(path)
            val orientation = exifInterface.getAttributeInt(
                ExifInterface.TAG_ORIENTATION,
                ExifInterface.ORIENTATION_NORMAL
            )
            
            // 원본 비트맵 로드
            val options = BitmapFactory.Options().apply {
                // 메모리 효율성을 위해 필요한 경우 이미지 다운샘플링
                inSampleSize = calculateInSampleSize(path, 1024, 1024)
            }
            val bitmap = BitmapFactory.decodeFile(path, options) ?: return null
            
            // 회전 각도 계산
            val rotationAngle = when (orientation) {
                ExifInterface.ORIENTATION_ROTATE_90 -> 90f
                ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                else -> 0f
            }
            
            // 회전이 필요하지 않은 경우 원본 비트맵 반환
            if (rotationAngle == 0f) {
                return bitmap
            }
            
            // 회전 매트릭스 적용
            val matrix = Matrix()
            matrix.postRotate(rotationAngle)
            
            // 회전된 비트맵 반환
            return Bitmap.createBitmap(
                bitmap, 0, 0,
                bitmap.width, bitmap.height,
                matrix, true
            )
        } catch (e: IOException) {
            Log.e(TAG, "이미지 로드 중 오류", e)
            return null
        }
    }
    
    // 적절한 샘플 크기 계산 (메모리 효율성을 위한 다운샘플링)
    private fun calculateInSampleSize(imagePath: String, reqWidth: Int, reqHeight: Int): Int {
        val options = BitmapFactory.Options().apply {
            inJustDecodeBounds = true // 메타데이터만 로드
        }
        BitmapFactory.decodeFile(imagePath, options)
        
        val height = options.outHeight
        val width = options.outWidth
        var inSampleSize = 1
        
        if (height > reqHeight || width > reqWidth) {
            val halfHeight = height / 2
            val halfWidth = width / 2
            
            // 요청된 크기보다 큰 가장 작은 inSampleSize 값을 계산
            while ((halfHeight / inSampleSize) >= reqHeight && (halfWidth / inSampleSize) >= reqWidth) {
                inSampleSize *= 2
            }
        }
        
        return inSampleSize
    }
}