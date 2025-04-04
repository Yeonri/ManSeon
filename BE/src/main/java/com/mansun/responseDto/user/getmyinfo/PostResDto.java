package com.mansun.responseDto.user.getmyinfo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class PostResDto {
    String title;
    String content;
    String postImg;
    int like;
    int commentNum;
    Long postId;
    LocalDate createdAt;
}
