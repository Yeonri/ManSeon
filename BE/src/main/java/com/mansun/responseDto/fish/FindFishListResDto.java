package com.mansun.responseDto.fish;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Getter
public class FindFishListResDto {
    Long fishId;
    String fishName;
    float size;
    LocalDate createdAt;
    String fishImg;
}
