package com.mansun.requestDto.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class UpdateMyBoardReqDto {
    @Schema(defaultValue = "1")
    Long postId;
    @Schema(defaultValue = "제목 바꿔요")
    String title;
    @Schema(defaultValue = "내용 바꿔요")
    String content;
    @Schema(defaultValue = "")
    LocalDateTime createdAt;
    @Schema(defaultValue = "img Url")
    String postImg;
    @Schema(defaultValue = "100")
    int likeNum;
    @Schema(defaultValue = "10000")
    int commentNum;
}
