package com.mansun.features.comment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Comment;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.features.comment.repository.CommentRepository;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import com.mansun.responseDto.comment.UpdateCommentResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
//    댓글 생성
    @Override
    public void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto req) {
        Board board=boardRepository.findById(req.getPostId()).orElseThrow();
        commentRepository.save(Comment.builder()
                        .user(board.getUser())
                        .board(board)
                        .recommentNum(0)
                        .commentContent(req.getContent())
                        .createdAt(LocalDateTime.now())
                        .deleted(false)
                .build());
    }

//    댓글 수정
    @Override
    public UpdateCommentResDto updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto req) {
//        댓글을 commentId로 찾고
        Comment comment=commentRepository.findById(req.getCommentId()).orElseThrow();
//        BeanUtils로 null이 아닌 값을 수정하고
        BeanUtils.copyProperties(req,comment, NullAwareBeanUtils.getNullPropertyNames(req));
//        return한다.
        return UpdateCommentResDto
                .builder()
                .commentId(comment.getCommentId())
                .commentContent(comment.getCommentContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    @Override
    public void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto req) {
//        delete Column을 true로 바꾼다.
        Comment comment=commentRepository.findById(req.getCommentId()).orElseThrow();
        comment.setDeleted(true);
    }
}
