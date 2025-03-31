package com.mansun.responseDto.badges;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class allBadgesByUserResDto {
    String badgeName;
    String badgeImg;
}
