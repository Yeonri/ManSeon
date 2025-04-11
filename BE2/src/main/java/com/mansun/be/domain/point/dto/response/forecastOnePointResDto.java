package com.mansun.be.domain.point.dto.response;

import com.mansun.be.domain.point.dto.response.allPoint.ForecastResDto;
import com.mansun.be.domain.point.dto.response.allPoint.TideDayResDto;
import com.mansun.be.domain.point.dto.response.allPoint.WaveResDto;
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
