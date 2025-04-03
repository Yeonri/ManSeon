package com.mansun.responseDto.board;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardListResDto {
    private Long boardId;
    private String title;
    private String nickname;
    private LocalDateTime createdAt;

    @QueryProjection
    public BoardListResDto(Long boardId, String title, String nickname, LocalDateTime createdAt) {
        this.boardId = boardId;
        this.title = title;
        this.nickname = nickname;
        this.createdAt = createdAt;
    }
}
