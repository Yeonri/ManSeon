package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TemperatureResDto {
    private double max;
    private double min;
}
