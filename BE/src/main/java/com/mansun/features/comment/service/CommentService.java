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
//    댓글 생성
    void createComment(CustomUserDetails customUserDetails, CreateCommentReqDto commentParam);
//    댓글 수정
    UpdateCommentResDto updateComment(CustomUserDetails customUserDetails, UpdateCommentReqDto req) ;
//    댓글 삭제
    void deleteComment(CustomUserDetails customUserDetails, DeleteCommentReqDto commentParam);
}
