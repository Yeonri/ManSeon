package com.mansun.be.domain.point.fishingpoint.service;


import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.domain.point.dto.request.CreateFishingPointReqDto;
import com.mansun.be.domain.point.dto.response.OnePointDetailInfoResDto;
import com.mansun.be.domain.point.dto.response.OnePointResDto;
import com.mansun.be.domain.point.dto.response.SearchPointResDto;
import com.mansun.be.domain.point.dto.response.allPoint.AllPointResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
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
