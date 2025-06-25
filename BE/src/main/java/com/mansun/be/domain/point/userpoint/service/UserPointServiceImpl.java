package com.mansun.be.domain.point.userpoint.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.domain.point.dto.request.CreateUserPointReqDto;
import com.mansun.be.domain.point.dto.response.UserPointListResDto;
import com.mansun.be.domain.point.entity.UserPoint;
import com.mansun.be.domain.point.fishingpoint.repository.FishingPointRepository;
import com.mansun.be.domain.point.userpoint.repository.UserPointRepository;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserPointServiceImpl implements UserPointService {
    private final UserPointRepository userPointRepository;
    private final FishingPointRepository fishingPointRepository;
    private final UserRepository userRepository;
    @Override
    public void createUserPoint(
            CustomUserDetails customUserDetails,
            CreateUserPointReqDto req) {

        User user = userRepository.findByUserIdAndDeletedFalse(customUserDetails.getUserId())
                        .orElseThrow();

        userPointRepository.save(
                UserPoint
                .builder()
                .user(user)
                .pointName(req.getPointName())
                .lat(req.getLat())
                .lng(req.getLng())
                .build());
    }

    @Override
    public List<UserPointListResDto> findUserPointList(
            CustomUserDetails customUserDetails
    ) {
        List<UserPoint> userPointList = userPointRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        return userPointList.stream()
                .map(
                        up -> UserPointListResDto
                                .builder()
                                .id(up.getPointId())
                                .name(up.getPointName())
                                .latitude(up.getLat())
                                .longitude(up.getLng())
                                .build()
                ).collect(Collectors.toList());
    }

    public void deleteUserPoint(CustomUserDetails customUserDetails){

    }
}