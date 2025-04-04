package com.mansun.features.point.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.requestDto.fishingpoint.SearchPointReqDto;
import com.mansun.responseDto.fishingPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FishingPointService {
    void createAllPoint(CreateFishingPointReqDto req);

    List<AllPointResDto> findAllPointList();

    OnePointResDto findOnePoint(Long pointId);

    OnePointDetailInfoResDto findOnePointDetailInfo(CustomUserDetails customUserDetails, Long pointId);

    SearchPointResDto searchFishingPointList(
            CustomUserDetails customUserDetails,
            String pointName
    );
}
