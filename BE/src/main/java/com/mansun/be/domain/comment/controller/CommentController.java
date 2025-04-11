package com.mansun.be.domain.comment.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.comment.dto.request.CreateCommentRequest;
import com.mansun.be.domain.comment.dto.request.UpdateCommentRequest;
import com.mansun.be.domain.comment.dto.response.CommentResponse;
import com.mansun.be.domain.comment.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{boardId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createComment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long boardId,
            @Valid @RequestBody CreateCommentRequest dto,
            HttpServletRequest request) {
        return commentService.createComment(boardId, userDetails, dto, request);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getComments(
            @PathVariable Long boardId,
            HttpServletRequest request) {
        return commentService.getComments(boardId, request);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable Long boardId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        return commentService.deleteComment(boardId, commentId, userDetails, request);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> updateComment(
            @PathVariable Long boardId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody UpdateCommentRequest dto,
            HttpServletRequest request) {
        return commentService.updateComment(boardId, commentId, userDetails, dto, request);
    }
}