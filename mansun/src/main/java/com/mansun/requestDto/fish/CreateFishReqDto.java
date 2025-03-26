package com.mansun.requestDto.fish;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateFishReqDto {
    float lat;
    float lng;
    float size;
    String bait;
    String equipment;
    String fishImg;
}
