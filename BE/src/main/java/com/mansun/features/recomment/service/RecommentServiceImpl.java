package com.mansun.features.recomment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.Users;
import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.features.comment.repository.CommentRepository;
import com.mansun.features.recomment.repository.RecommentRepository;
import com.mansun.requestDto.recomment.CreateRecommentReqDto;
import com.mansun.requestDto.recomment.DeleteRecommentReqDto;
import com.mansun.requestDto.recomment.UpdateRecommentReqDto;
import com.mansun.responseDto.recomment.UpdateRecommentResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommentServiceImpl implements RecommentService {
    private final CommentRepository commentRepository;
    private final RecommentRepository repository;

    @Override
    public void createRecomment(CustomUserDetails customUserDetails, CreateRecommentReqDto req) {
        Comment comment=commentRepository.findById(req.getCommentId()).orElseThrow();
        repository.save(
                Recomment.builder()
                        .user(new Users(customUserDetails))
                        .board(comment.getBoard())
                        .comment(comment)
                        .recommentContent(req.getContent())
                        .createdAt(LocalDateTime.now())
                        .deleted(false)
                .build());
    }

    @Override
    public UpdateRecommentResDto updateRecomment(CustomUserDetails customUserDetails, UpdateRecommentReqDto req) {
        Recomment recomment = repository
                .findByUser_UserIdAndRecommentIdAndDeletedFalse(customUserDetails.getUserId(), req.getRecommentId())
                .orElseThrow();
        BeanUtils.copyProperties(req, recomment, NullAwareBeanUtils.getNullPropertyNames(req));
        return UpdateRecommentResDto
                .builder()
                .recommentId(recomment.getRecommentId())
                .userId(recomment.getUser().getUserId())
                .boardId(recomment.getBoard().getBoardId())
                .commentId(recomment.getRecommentId())
                .recommentContent(recomment.getRecommentContent())
                .createdAt(recomment.getCreatedAt())
                .build();
    }

    @Override
    public void deleteRecomment(CustomUserDetails customUserDetails, DeleteRecommentReqDto req) {
        Recomment recomment = repository
                .findByUser_UserIdAndRecommentIdAndDeletedFalse(customUserDetails.getUserId(), req.getRecommentId())
                .orElseThrow();
        recomment.setDeleted(true);
    }
}
