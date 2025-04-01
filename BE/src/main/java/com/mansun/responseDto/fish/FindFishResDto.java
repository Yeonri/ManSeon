package com.mansun.responseDto.fish;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
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
