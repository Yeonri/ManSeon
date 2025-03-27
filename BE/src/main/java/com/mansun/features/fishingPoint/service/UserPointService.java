package com.mansun.features.fishingPoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.responseDto.fishingPoint.FindUserPointListResDto;

import java.util.List;

public interface UserPointService {
    void createUserPoint(
            CustomUserDetails customUserDetails,
            CreateUserPointReqDto req);

    List<FindUserPointListResDto> findUserPointList(
            CustomUserDetails customUserDetails
    );
}
