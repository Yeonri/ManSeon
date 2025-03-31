package com.mansun.requestDto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "댓글 추가를 위한 필요 정보")
public class CreateCommentReqDto {
    @NotNull(message = "게시글이 있어야 합니다.")
    @Schema(defaultValue = "1")
    Long postId;
    @NotNull(message = "게시글 제목은 필수입니다")
    @Schema(defaultValue = "게시글 만들 제목")
    String title;
    @NotNull(message = "게시글 내용은 필수입니다")
    @Schema(defaultValue = "게시글 만들 내용")
    String content;
}
