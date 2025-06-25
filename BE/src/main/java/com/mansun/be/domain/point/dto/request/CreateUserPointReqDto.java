package com.mansun.be.domain.point.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class CreateUserPointReqDto {
    @Schema(defaultValue = "이진형 포인트")
    String pointName;
    @Schema(defaultValue = "방파제")
    String primaryMaterial;
    @Schema(defaultValue = "깊이인가? 이건")
    String depthRange;
    @Schema(defaultValue = "131")
    float lat;
    @Schema(defaultValue = "37")
    float lng;
}
