package com.mansun.requestDto.fishingpoint;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class CreateFishingPointReqDto {
    @Schema(defaultValue = "맛동산")
    String pointName;
    @Schema(defaultValue = "131")
    float pointLat;
    @Schema(defaultValue = "37")
    float pointLng;
    @Schema(defaultValue = "바위")
    String primaryMaterial;
    Integer weatherX;
    Integer weatherY;
    String sunmoonLocation;
    String nearestTideStation;
}
