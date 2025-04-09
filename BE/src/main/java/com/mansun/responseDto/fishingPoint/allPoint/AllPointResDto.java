package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;

@Builder
@Getter
public class AllPointResDto {
    Long pointId;
    //    Column
    String pointName;
    float latitude;
    float longitude;
    String water_depth;
    String seabed_type;
    String sunrise;
    String sunset;
    double temperature_max;
    double temperature_min;
//    List<ForecastResDto> weather_forecast;
//    List<TideDayResDto> tide_info;
//    List<WaveResDto> wave_info;
}
