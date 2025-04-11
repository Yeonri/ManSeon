package com.mansun.be.domain.point.userpoint.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.domain.point.dto.request.CreateUserPointReqDto;
import com.mansun.be.domain.point.dto.response.UserPointListResDto;
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
