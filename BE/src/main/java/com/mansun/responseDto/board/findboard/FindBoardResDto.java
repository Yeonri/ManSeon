package com.mansun.responseDto.board.findboard;

import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Builder
@Getter
public class FindBoardResDto {
    Long postId;
    Long userId;
    String nickname;
    String profileImg;
    String title;
    String content;
    OffsetDateTime createdAt;
    String postImg;
    int commentNum;
    int like;
    List<FindBoardCommentResDto> commentList;
}
