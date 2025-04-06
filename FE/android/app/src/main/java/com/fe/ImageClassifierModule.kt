package com.fe

import android.graphics.BitmapFactory
import android.util.Log
import com.facebook.react.bridge.*
import java.io.File

class ImageClassifierModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val modelHelper = ModelHelper(reactContext)

    override fun getName(): String = "ImageClassifier"

    @ReactMethod
    fun classifyImage(imagePath: String, promise: Promise) {
        try {
            val path = imagePath.removePrefix("file://")
            val imgFile = File(path)
            if (!imgFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "Image not found at path: $path")
                return
            }

            val bitmap = BitmapFactory.decodeFile(imgFile.absolutePath)
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "Failed to decode image: $path")
                return
            }

            val results = modelHelper.classifyRawBitmap(bitmap)

            val array = Arguments.createArray()
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

            promise.resolve(array)

        } catch (e: Exception) {
            promise.reject("INFERENCE_ERROR", e.message)
        }
    }

}
