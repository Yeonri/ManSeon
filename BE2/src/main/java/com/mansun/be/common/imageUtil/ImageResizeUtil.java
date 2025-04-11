package com.mansun.be.common.imageUtil;


import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.UncheckedIOException;

public class ImageResizeUtil {

    // 1. 정사각형 썸네일 만들기
    public static BufferedImage createSquareThumbnail(MultipartFile file) {
        try {
            BufferedImage original = ImageIO.read(file.getInputStream());
            int size = Math.min(original.getWidth(), original.getHeight());
            return Thumbnails.of(original)
                    .sourceRegion(Positions.CENTER, size, size) // 중앙에서 자름
                    .size(250, 250) // 크기 조정은 차후에 다시 할 예정 250pixel*250pixel
                    .asBufferedImage();
        } catch (IOException e) {

            throw new UncheckedIOException(e);

        }
    }
    // 2. 저장 용량은 1MB아래로 ( 해상도 차이가 심하다면 사용 X )
    public static BufferedImage resizeToMax1MB(MultipartFile file) {
        try {
            return Thumbnails.of(file.getInputStream())
                    .size(1024, 1024)
                    .outputQuality(0.85)
                    .asBufferedImage();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    // 3. 이미지 압축 ( 해상도는 건들 ㄴㄴ, 일기장에 사용 예정 )
    public static BufferedImage compressQuality(MultipartFile file) {
        try {
            return Thumbnails.of(file.getInputStream())
                    .scale(1.0)
                    .outputQuality(0.8f)
                    .asBufferedImage();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}

