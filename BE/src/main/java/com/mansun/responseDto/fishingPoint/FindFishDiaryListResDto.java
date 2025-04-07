package com.mansun.responseDto.fishingPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class FindFishDiaryListResDto {
    Long fishId;
    String fishType;
    float size;
    OffsetDateTime createdAt;
    String fishImg;
}
