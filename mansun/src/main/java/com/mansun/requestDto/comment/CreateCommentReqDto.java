package com.mansun.requestDto.comment;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateCommentReqDto {
    String postId;
    String title;
    String content;
}
