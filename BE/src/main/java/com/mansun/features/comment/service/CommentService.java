package com.mansun.features.comment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.board.Comment;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import com.mansun.responseDto.comment.UpdateCommentResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CommentService {
    void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto commentParam);
    UpdateCommentResDto updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto req) ;
    void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto commentParam);
}
