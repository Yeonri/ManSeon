package com.mansun.be.domain.point.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
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
