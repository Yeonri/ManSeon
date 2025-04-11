package com.mansun.be.domain.point.dto.response.allPoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ForecastResDto {
    // 모든 필드를 받는 생성자
    // 모든 필드를 받는 생성자
    public ForecastResDto(LocalDate weatherDate, LocalDateTime weatherTime, int sky, double temperature,
                          String precipitation, int precipitation_prob, int humidity, int precipitation_type) {
        this.date = LocalDateTime.of(weatherDate, weatherTime.toLocalTime()).atOffset(ZoneOffset.UTC);
        this.sky = sky;
        this.temperature = temperature;
        this.precipitation = precipitation;
        this.precipitation_prob = precipitation_prob;
        this.humidity = humidity;
        this.precipitation_type = precipitation_type;
    }
    OffsetDateTime date;
    int sky;
    double temperature;
    String precipitation;
    int precipitation_prob;
    int humidity;
    int precipitation_type;
}
