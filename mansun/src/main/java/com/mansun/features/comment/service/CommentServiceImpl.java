package com.mansun.features.comment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.board.Comment;
import com.mansun.features.comment.repository.CommentRepository;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    @Override
    public void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto commentParam) {
        commentRepository.save(new Comment(customUserDetails,commentParam));
    }

    @Override
    public void updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto commentParam) {

    }

    @Override
    public void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto commentParam) {

    }
}
