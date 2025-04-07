package com.mansun.responseDto.board;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class BoardListResDto {
    private Long boardId;
    private String title;
    private String nickname;
    private OffsetDateTime createdAt;

    @QueryProjection
    public BoardListResDto(Long boardId, String title, String nickname, OffsetDateTime createdAt) {
        this.boardId = boardId;
        this.title = title;
        this.nickname = nickname;
        this.createdAt = createdAt;
    }
}
