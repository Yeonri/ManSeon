package com.mansun.be.domain.fish.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FishCreateRequest {

    @NotNull
    private String fishName; // FK로 연결될 물고기 종류 ID

    @NotNull
    private Double lat; // 위도

    @NotNull
    private Double lng; // 경도

    private Float size; // 크기 (선택)

    private String bait; // 미끼 종류

    private String equipment; // 장비 종류

    private MultipartFile image; // 이미지 URL (선택, 추후 업로드 방식에 따라 multipart로 분리 가능)
}
