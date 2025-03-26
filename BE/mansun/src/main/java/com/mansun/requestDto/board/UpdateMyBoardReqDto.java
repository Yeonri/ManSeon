package com.mansun.requestDto.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateMyBoardReqDto {
    Long postId;
    String title;
    String content;
    LocalDateTime createdAt;
    String postImg;
    int likeNum;
    int commentNum;
}
