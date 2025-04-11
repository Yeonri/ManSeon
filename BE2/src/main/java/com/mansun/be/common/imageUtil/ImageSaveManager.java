package com.mansun.be.common.imageUtil;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImageSaveManager {

    private static final String BASE_PATH = "/BE/storage";

    public static void processAndSaveImage(int type, Long targetId, MultipartFile imageFile) {

        try {
            switch (type) {
                case 0 -> saveProfileImage(targetId, imageFile);  // 프로필
                case 1 -> saveFishImage(targetId, imageFile);     // 물고기
                case 2 -> saveBoardImage(targetId, imageFile);    // 게시글
                default -> throw new IllegalArgumentException("Unsupported image type: " + type);
            }
        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 중 오류 발생", e);
        }
    }

    // 0. 프로필 사진: 중앙 자르고 250x250
    private static void saveProfileImage(Long userId, MultipartFile imageFile) throws IOException {
        BufferedImage thumb = ImageResizeUtil.createSquareThumbnail(imageFile);
        String savePath = BASE_PATH + "/profile/" + userId + ".jpg";
        saveBufferedImage(thumb, savePath);
    }

    // 1. 물고기 사진: 원본 저장 + 압축 저장
    private static void saveFishImage(Long fishId, MultipartFile imageFile) throws IOException {
        // 원본 저장
        String originalPath = BASE_PATH + "/fish/" + fishId + ".jpg";
        imageFile.transferTo(new File(originalPath));

        // 압축 저장 (해상도 유지, 품질만 조정)
        BufferedImage compressed = ImageResizeUtil.compressQuality(imageFile);
        String compressedPath = BASE_PATH + "/fish_compressed/" + fishId + ".jpg";
        saveBufferedImage(compressed, compressedPath);
    }

    // 2. 게시글: 썸네일 저장 + 본문 이미지 원본 저장
    private static void saveBoardImage(Long boardId, MultipartFile imageFile) throws IOException {
        // 썸네일 생성
        BufferedImage thumb = ImageResizeUtil.createSquareThumbnail(imageFile);
        String thumbPath = BASE_PATH + "/thumb/" + boardId + ".jpg";
        saveBufferedImage(thumb, thumbPath);

        // 본문 이미지 원본 저장
        String resizedPath = BASE_PATH + "/resized/" + boardId + ".jpg";
        imageFile.transferTo(new File(resizedPath));
    }

    // 공통 저장 메서드 (BufferedImage → 파일로 저장)
    private static void saveBufferedImage(BufferedImage image, String path) throws IOException {
        File file = new File(path);
        ImageIO.write(image, "jpg", file);
    }
}
