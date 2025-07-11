package com.mansun.be.domain.point.dto.response.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;

@Builder
@Getter
public class AllPointResDto {
    Long point_id;
    //    Column
    String point_name;
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
