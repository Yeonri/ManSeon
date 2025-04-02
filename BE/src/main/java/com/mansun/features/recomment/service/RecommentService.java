package com.mansun.features.recomment.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.board.Recomment;
import com.mansun.requestDto.recomment.CreateRecommentReqDto;
import com.mansun.requestDto.recomment.DeleteRecommentReqDto;
import com.mansun.requestDto.recomment.UpdateRecommentReqDto;
import com.mansun.responseDto.recomment.UpdateRecommentResDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommentService  {
    void createRecomment(CustomUserDetails customUserDetails, CreateRecommentReqDto req);

    UpdateRecommentResDto updateRecomment(CustomUserDetails customUserDetails, UpdateRecommentReqDto req);

    void deleteRecomment(CustomUserDetails customUserDetails, DeleteRecommentReqDto req);
}
