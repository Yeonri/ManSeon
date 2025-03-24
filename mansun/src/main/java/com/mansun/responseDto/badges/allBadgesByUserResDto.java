package com.mansun.responseDto.badges;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class allBadgesByUserResDto {
    String badgeName;
    String badgeImg;
}
