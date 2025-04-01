package com.mansun.responseDto.fishingPoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
public class UserPointListResDto {
    Long pointId;
    String pointName;
}
