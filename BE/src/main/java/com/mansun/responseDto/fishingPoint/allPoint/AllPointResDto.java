package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
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
    boolean isBookmarked;
    boolean isMyPoint;
    boolean isRecommeded;
    String water_depth;
    String seabed_type;
    OffsetDateTime sunrise;
    OffsetDateTime sunset;
    float temperature_max;
    float temperature_min;
    List<ForecastResDto> weather_forecast;
    List<TideDayResDto> tide_info;
    List<CaughtFishResDto> caught_fish_summary;
}
