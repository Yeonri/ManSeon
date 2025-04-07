package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class WaveResDto {
    String wind_direction;
    double wind_speed;
    double wave_height;

    double water_temperature;

    String wave_direction;
}
