package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TemperatureResDto {
    private float max;
    private float min;
}
