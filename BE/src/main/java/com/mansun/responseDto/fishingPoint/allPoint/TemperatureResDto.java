package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TemperatureResDto {
    private double max=Integer.MIN_VALUE;
    private double min=Integer.MAX_VALUE;

}
