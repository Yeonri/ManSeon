package com.mansun.responseDto.fish;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class FindFishListResDto {
    Long fishId;
    String fishType;
    float size;
    LocalDate date;
    LocalDateTime createdAt;
    float lat;
    float lng;
    String bait;
    String equipment;
    String fishImg;
    int season;
}
