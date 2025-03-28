package com.mansun.features.point.userpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.responseDto.fishingPoint.UserPointListResDto;

import java.util.List;

public interface UserPointService {
    void createUserPoint(
            CustomUserDetails customUserDetails,
            CreateUserPointReqDto req);

    List<UserPointListResDto> findUserPointList(
            CustomUserDetails customUserDetails
    );
}
