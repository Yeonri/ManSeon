package com.mansun.responseDto.user.getmyinfo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class PostResDto {
    String title;
    String content;
    String postImg;
    int like;
    int commentNum;
    Long postId;
    OffsetDateTime createdAt;
}
