package com.mansun.responseDto.fishingPoint;

import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    LocalDateTime sunrise;
    LocalDateTime sunset;
    float temperature_max;
    float temperature_min;
    List<Weather> weather_forecast;
    List<TideLevel> tide_info;
    List<Fish> caught_fish_summary;
}
