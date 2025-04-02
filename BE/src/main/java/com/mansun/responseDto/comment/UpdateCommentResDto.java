package com.mansun.responseDto.comment;

import com.mansun.entity.Users;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Recomment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class UpdateCommentResDto {
    private Long commentId;

    //    연관 관계

    private Users user;


    private Board board;

    private List<Recomment> recomment;

    private String commentContent;
    private LocalDateTime createdAt;
    private int recommentNum;
}
