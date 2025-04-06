package com.mansun.responseDto.board;

import com.mansun.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class allBoardListResDto {
    Long postId;
    Long userId;
    String nickname;
    String profileImg;
    String title;
    String content;
    LocalDateTime createdAt;
    String postImg;
    int commentNum;
    int like;
}