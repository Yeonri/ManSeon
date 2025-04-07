package com.mansun.responseDto.board.findboard;

import com.mansun.entity.board.Recomment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Builder
@Getter
public class FindBoardCommentResDto {
    private Long commentId;
    private Long boardId;
    private Long userId;
    private String username;
    private String nickname;
    private String commentUserProfile;
    //    Column
    private String commentContent;
    private OffsetDateTime createdAt;
    private int recommentNum;
    List<FindBoardCommentRecommentResDto> recomment;
}
