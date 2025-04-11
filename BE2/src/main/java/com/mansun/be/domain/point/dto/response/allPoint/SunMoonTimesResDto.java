package com.mansun.be.domain.point.dto.response.allPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.OffsetDateTime;

@Builder
@Getter
public class SunMoonTimesResDto {
    private OffsetDateTime sunrise;
    private OffsetDateTime sunset;
}
