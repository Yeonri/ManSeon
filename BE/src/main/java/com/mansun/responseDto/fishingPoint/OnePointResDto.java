package com.mansun.responseDto.fishingPoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
