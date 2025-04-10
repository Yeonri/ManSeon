package com.mansun.features.fishingpoint.userpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.responseDto.fishingPoint.UserPointListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public interface UserPointService {
    void createUserPoint(
            CustomUserDetails customUserDetails,
            CreateUserPointReqDto req);

    List<UserPointListResDto> findUserPointList(
            CustomUserDetails customUserDetails
    );
}
