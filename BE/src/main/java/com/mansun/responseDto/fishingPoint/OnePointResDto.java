package com.mansun.responseDto.fishingPoint;

import lombok.Builder;

@Builder
public class OnePointResDto {
    Long pointId;
    //    Column
    String pointName;
    float pointLat;
    float pointLng;
    String primaryMaterial;
    Integer weatherX;
    Integer weatherY;
    String sunmoonLocation;
    String nearestTideStation;
}
