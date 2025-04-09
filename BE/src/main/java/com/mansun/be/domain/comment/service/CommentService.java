package com.mansun.be.domain.comment.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.board.exception.UnauthorizedException;
import com.mansun.be.domain.board.repository.BoardRepository;
import com.mansun.be.domain.comment.dto.request.CreateCommentRequest;
import com.mansun.be.domain.comment.dto.request.UpdateCommentRequest;
import com.mansun.be.domain.comment.dto.response.CommentResponse;
import com.mansun.be.domain.comment.entity.Comment;
import com.mansun.be.domain.comment.repository.CommentRepository;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public ResponseEntity<ApiResponse<Void>> createComment(
            Long boardId,
            CustomUserDetails userDetails,
            CreateCommentRequest dto,
            HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글을 찾을 수 없습니다."));

        Comment parent = null;
        if (dto.getParentId() != null) {
            parent = commentRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new NoSuchElementException("부모 댓글을 찾을 수 없습니다."));
        }

        Comment comment = Comment.create(board, user, dto.getContent(), parent);
        commentRepository.save(comment);

        return ApiResponseUtil.success(null, "댓글 등록 성공", HttpStatus.CREATED, request.getRequestURI());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getComments(Long boardId, HttpServletRequest request) {
        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글을 찾을 수 없습니다."));

        List<Comment> comments = commentRepository.findAllByBoardAndParentIsNullAndDeletedFalseOrderByCreatedAtAsc(board);

        List<CommentResponse> responses = comments.stream()
                .map(CommentResponse::from)
                .collect(Collectors.toList());

        return ApiResponseUtil.success(responses, "댓글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<Void>> deleteComment(
            Long boardId,
            Long commentId,
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("댓글이 존재하지 않습니다."));

        if (!comment.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new UnauthorizedException("삭제 권한이 없습니다.");
        }

        comment.softDelete();
        return ApiResponseUtil.success(null, "댓글 삭제 성공", HttpStatus.OK, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<Void>> updateComment(
            Long boardId,
            Long commentId,
            CustomUserDetails userDetails,
            UpdateCommentRequest dto,
            HttpServletRequest request) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("댓글이 존재하지 않습니다."));

        if (!comment.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }

        comment.update(dto.getContent());
        return ApiResponseUtil.success(null, "댓글 수정 성공", HttpStatus.OK, request.getRequestURI());
    }
}
