package com.mansun.responseDto.fishingPoint.allPoint;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class TideLevelResDto {
    private OffsetDateTime tphTime;
    private String hlCode;
    private int tphLevel;
}
