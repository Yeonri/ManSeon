package com.mansun.requestDto.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class CreateBadgeReqDto {
    @Schema(defaultValue = "첫 게시물 작성")
    String badgeName;
    @Schema(defaultValue = "Img Url")
    String badgeImg;
}