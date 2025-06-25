package com.mansun.be.domain.point.dto.response.allPoint;

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
