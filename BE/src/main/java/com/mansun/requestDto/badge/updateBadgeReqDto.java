package com.mansun.requestDto.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
public class updateBadgeReqDto {
    @Schema(defaultValue = "1")
    Long badgeId;
    @Schema(defaultValue = "뱃지 이름 바꿔요")
    String badgeName;
    @Schema(defaultValue = "img url")
    String badgeImg;
}
