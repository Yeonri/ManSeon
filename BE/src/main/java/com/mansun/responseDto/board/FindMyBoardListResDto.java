package com.mansun.responseDto.board;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class FindMyBoardListResDto {
    Long postId;
    String title;
    String content;
    OffsetDateTime createdAt;
    Long userId;
    String profileImg;
    String postImg;
}
