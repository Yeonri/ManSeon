package com.mansun.features.point.userpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.fishingPoint.UserPoint;
import com.mansun.features.point.fishingpoint.repository.FishingPointRepository;
import com.mansun.features.point.userpoint.repository.UserPointRepository;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.responseDto.fishingPoint.UserPointListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPointServiceImpl implements UserPointService {
    private final UserPointRepository userPointRepository;
    private final FishingPointRepository fishingPointRepository;
    @Override
    public void createUserPoint(
            CustomUserDetails customUserDetails,
            CreateUserPointReqDto req) {
        userPointRepository.save(UserPoint
                .builder()
                .user(new Users(customUserDetails))
                .pointName(req.getPointName())
                .lat(req.getLat())
                .lng(req.getLng())
                .build());
    }

    @Override
    public List<UserPointListResDto> findUserPointList(
            CustomUserDetails customUserDetails
    ) {
        List<UserPoint> userPointList = userPointRepository.findByUser_UserId(customUserDetails.getUserId());
        return userPointList.stream()
                .map(
                        up -> UserPointListResDto
                                .builder()
                                .pointId(up.getPointId())
                                .pointName(up.getPointName())
                                .build()
                ).collect(Collectors.toList());
    }

    public void deleteUserPoint(CustomUserDetails customUserDetails){

    }
}