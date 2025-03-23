package com.mansun.features.comment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.comment.repository.CommentRepository;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import com.mansun.requestDto.comment.DeleteCommentReqDto;
import com.mansun.requestDto.comment.UpdateCommentReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CommentService {
    public void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto commentParam);


    public void updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto commentParam);

    public void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto commentParam);
}
