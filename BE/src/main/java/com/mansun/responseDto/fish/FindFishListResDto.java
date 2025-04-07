package com.mansun.responseDto.fish;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class FindFishListResDto {
    Long fishId;
    String fishType;
    float size;
    OffsetDateTime date;
    OffsetDateTime createdAt;
    float lat;
    float lng;
    String bait;
    String equipment;
    String fishImg;
    int season;
}
