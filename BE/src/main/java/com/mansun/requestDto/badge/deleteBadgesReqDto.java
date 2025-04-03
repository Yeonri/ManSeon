package com.mansun.requestDto.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class deleteBadgesReqDto {
    @Schema(defaultValue = "1")
    Long badgeId;
}
