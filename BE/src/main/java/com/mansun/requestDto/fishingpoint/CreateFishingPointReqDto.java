package com.mansun.requestDto.fishingpoint;

import lombok.Getter;

@Getter
public class CreateFishingPointReqDto {
    String pointName;
    float pointLat;
    float pointLng;
    String primaryMaterial;
    Integer weatherX;
    Integer weatherY;
    String sunmoonLocation;
    String nearestTideStation;
}
