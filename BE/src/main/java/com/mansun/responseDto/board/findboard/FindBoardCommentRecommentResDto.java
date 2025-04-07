package com.mansun.responseDto.board.findboard;

import com.mansun.entity.Users;
import com.mansun.entity.board.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class FindBoardCommentRecommentResDto {
    private Long recommentId;
    //  연관 관계
    private Long userId;
    private Long boardId;
    private Long commentId;
    //  Column
    private String recommentContent;
    private OffsetDateTime createdAt;
}
