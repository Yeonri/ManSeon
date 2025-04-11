package com.mansun.be.domain.board.dto.response;

import com.mansun.be.domain.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
public class BoardResponse {
    private Long userId;
    private String nickname;
    private String profileImg;
    private Long boardId;
    private String title;
    private String content;
    private String postImg;
    private String thumbImg;
    private String createdAt; // ISO 8601 형식으로 응답

    public static BoardResponse from(Board board) {
        return BoardResponse.builder()
                .userId(board.getUser().getUserId())
                .nickname(board.getUser().getNickname())
                .profileImg(board.getUser().getProfileImg())
                .boardId(board.getBoardId())
                .title(board.getTitle())
                .content(board.getContent())
                .postImg(board.getPostImg())
                .thumbImg(board.getThumbImg())
                .createdAt(board.getCreatedAt()
                        .atOffset(ZoneOffset.UTC)
                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                .build();
    }
}