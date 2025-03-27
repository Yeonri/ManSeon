package com.mansun.responseDto.fish;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class FindFishResDto {
    Long fishId;
    //Column
    LocalDateTime createdAt;
    float lat;
    float lng;

    float size;
    String bait;

    String equipment;
    String fishImg;
}
