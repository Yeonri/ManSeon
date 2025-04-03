package com.mansun.requestDto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeleteCommentReqDto {
    @Schema(defaultValue = "1")
    Long commentId;
}
