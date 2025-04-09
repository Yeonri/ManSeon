package com.mansun.features.fishingpoint.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.allPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FishingPointService {
    void createAllPoint(CreateFishingPointReqDto req);
    List<AllPointResDto> findAllPointList(CustomUserDetails customUserDetails);
    OnePointResDto findOnePoint(Long pointId);
    OnePointDetailInfoResDto findOnePointDetailInfo(CustomUserDetails customUserDetails, Long pointId);
    List<SearchPointResDto> searchFishingPointList(
            CustomUserDetails customUserDetails,
            String pointName
    );
}
