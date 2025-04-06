package com.mansun.requestDto.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "게시판 글 추가")
public class CreateBoardReqDto {
    @Schema(defaultValue = "와 월척이에요")
    String title;
    @Schema(defaultValue = "ㅈㄱㄴ")
    String content;
    String postImg;
}
