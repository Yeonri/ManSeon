package com.mansun.responseDto.fishingPoint;

import com.mansun.responseDto.fishingPoint.allPoint.ForecastResDto;
import com.mansun.responseDto.fishingPoint.allPoint.TideDayResDto;
import com.mansun.responseDto.fishingPoint.allPoint.WaveResDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class forecastOnePointResDto {
    Long point_id;
    String point_name;
    List<ForecastResDto> weather_forecast;
    List<TideDayResDto> tide_info;
    List<WaveResDto> wave_info;
}
