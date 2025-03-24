package com.mansun.requestDto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "댓글 추가를 위한 필요 정보")
public class CreateCommentReqDto {
    @Schema(defaultValue = "0")
    Long postId;
    @Schema(defaultValue = "게시글 추가 예시 제목")
    String title;
    @Schema(defaultValue = "게시글 추가 예시 내용")
    String content;
}
