package com.mansun.responseDto.fishingPoint;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindFishDiaryListResDto {
    Long fishId;
    String fishType;
    float size;
    LocalDateTime createdAt;
    String fishImg;
}
