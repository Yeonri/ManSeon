package com.mansun.features.comment;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.comment.service.CommentServiceImpl;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Tag(name = "CommentController", description = "댓글의 CUD를 담당하는 컨트롤러(조회 기능은 게시판 컨트롤러에서 일괄 처리 예정)")
public class CommentController {
    private final CommentServiceImpl commentService;

    @Operation(summary = "댓글 추가")
    @PostMapping
    public ResponseEntity<String> createComment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid CreateCommentReqDto req) {
        commentService.createComment(customUserDetails, req);
        return ResponseEntity.ok("댓글이 게시되었습니다");
    }

    @Operation(summary = "댓글 수정")
    @PatchMapping
    public ResponseEntity<String> updateComment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            UpdateCommentReqDto req
    ) {
        commentService.updateComment(customUserDetails, req);
        return ResponseEntity.ok("댓글 수정이 완료되었습니다");
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping
    public ResponseEntity<String> deleteComment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            DeleteCommentReqDto req
    ) {
        commentService.deleteComment(customUserDetails, req);
        return ResponseEntity.ok("댓글이 삭제되었습니다");
    }
}
