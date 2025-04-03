package com.mansun.responseDto.board;

import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
public class FindBoardResDto {
    Long boardId;
    String title;
    String content;
    List<Comment> commentList;
    List<Recomment> recommentList;
}
