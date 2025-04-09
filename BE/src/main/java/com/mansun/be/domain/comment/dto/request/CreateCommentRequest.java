package com.mansun.be.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;


@Getter
public class CreateCommentRequest {
    @NotBlank
    private String content;
    private Long parentId; // null이면 일반 댓글, 값이 있으면 대댓글
}