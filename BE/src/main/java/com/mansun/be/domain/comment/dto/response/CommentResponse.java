package com.mansun.be.domain.comment.dto.response;

import com.mansun.be.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class CommentResponse {
    private Long commentId;
    private String content;
    private String nickname;
    private String profileImg;
    private LocalDateTime createdAt;
    private List<CommentResponse> replies;

    public static CommentResponse from(Comment comment) {
        return CommentResponse.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .nickname(comment.getUser().getNickname())
                .profileImg(comment.getUser().getProfileImg())
                .createdAt(comment.getCreatedAt())
                .replies(comment.getChildren().stream()
                        .filter(c -> !c.isDeleted())
                        .sorted(Comparator.comparing(Comment::getCreatedAt))
                        .map(CommentResponse::from)
                        .collect(Collectors.toList()))
                .build();
    }
}