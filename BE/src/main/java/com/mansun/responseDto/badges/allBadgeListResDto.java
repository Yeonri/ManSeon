package com.mansun.responseDto.badges;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Builder
@Getter
public class allBadgeListResDto {
    Long badgeId;
    String badgeName;
    String badgeImg;
}
