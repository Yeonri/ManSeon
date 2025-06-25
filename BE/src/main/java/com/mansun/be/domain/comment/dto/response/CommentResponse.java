package com.mansun.be.domain.comment.dto.response;

import com.mansun.be.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class CommentResponse {

    private Long commentId;
    private String content;
    private String authorNickname;
    private String createdAt;
    private List<CommentResponse> replies;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getCommentId(),
                comment.isDeleted() ? "(삭제된 댓글입니다)" : comment.getContent(),
                comment.getUser().getNickname(),
                comment.getCreatedAt().atOffset(ZoneOffset.UTC).format(formatter),
                comment.getReplies().stream()
                        .filter(reply -> !reply.isDeleted())
                        .map(CommentResponse::from)
                        .collect(Collectors.toList())
        );
    }
}
