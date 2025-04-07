package com.mansun.responseDto.recomment;

import com.mansun.entity.Users;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
@Getter
public class UpdateRecommentResDto {
    private Long recommentId;
    //  연관 관계
    private Long userId;

    private Long boardId;

    private Long commentId;

    //  Column

    private String recommentContent;
    private OffsetDateTime createdAt;
}
