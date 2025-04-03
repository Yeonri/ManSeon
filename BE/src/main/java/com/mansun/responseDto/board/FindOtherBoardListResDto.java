package com.mansun.responseDto.board;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindOtherBoardListResDto {
    Long postId;
    String title;
    String content;
    LocalDateTime createdAt;
    Long userId;
    String profileImg;
    String postImg;
}
