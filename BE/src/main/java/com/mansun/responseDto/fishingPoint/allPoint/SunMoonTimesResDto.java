package com.mansun.responseDto.fishingPoint.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.OffsetDateTime;

@Builder
@Getter
public class SunMoonTimesResDto {
    private OffsetDateTime sunrise;
    private OffsetDateTime sunset;
}
