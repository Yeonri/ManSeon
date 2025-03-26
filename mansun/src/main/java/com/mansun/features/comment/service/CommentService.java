package com.mansun.features.comment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CommentService {
    void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto commentParam);
    void updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto commentParam);
    void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto commentParam);
}
