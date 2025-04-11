package com.mansun.be.domain.comment.dto.request;

import lombok.Getter;

@Getter
public class CreateCommentRequest {
    private String content;
    private Long parentId;  // null이면 일반 댓글
}
