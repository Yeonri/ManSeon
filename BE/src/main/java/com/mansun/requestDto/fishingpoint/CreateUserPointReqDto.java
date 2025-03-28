package com.mansun.requestDto.fishingpoint;

import lombok.Getter;

@Getter
public class CreateUserPointReqDto {
    String pointName;
    String primaryMaterial;
    String depthRange;
    float lat;
    float lng;

}
