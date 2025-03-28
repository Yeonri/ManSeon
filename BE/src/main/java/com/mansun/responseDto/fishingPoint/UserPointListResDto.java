package com.mansun.responseDto.fishingPoint;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserPointListResDto {
    Long pointId;
    String pointName;
}
