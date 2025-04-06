package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Builder
@Getter
public class ForecastResDto {
    LocalDate date;
    LocalTime time;
    int sky;
    double temperature;
    double precipitation;
    int precipitation_prob;
    int humidity;
    String wind_direction;
    double wind_speed;
    double wave_height;

    double water_temperature;

    String wave_direction;
    int precipitation_type;
}
