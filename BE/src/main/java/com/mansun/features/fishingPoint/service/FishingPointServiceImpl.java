package com.mansun.features.fishingPoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.features.fishingPoint.repository.FishingPointRepository;
import com.mansun.requestDto.fishingpoint.SearchPointReqDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPointResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishingPointServiceImpl {
    private final FishingPointRepository fishingPointRepository;

    //포인트 명에 따른 검색 기능
    public List<SearchPointResDto> searchFishingPointList(
            CustomUserDetails customUserDetails,
            SearchPointReqDto req
    ){
        return null;
    }

    //전체 포인트 리스트
    public List<allPointResDto> findAllPointList(){
        List<FishingPoint> fishingPointList=fishingPointRepository.findAll();

        return fishingPointList.stream().map(
                fp->allPointResDto
                        .builder()
                        .pointId(fp.getPointId())
                        .pointName(fp.getPointName())
                        .build()
        ).collect(Collectors.toList());
    }
    public OnePointResDto findOnePoint(Long pointId){
        FishingPoint point=fishingPointRepository.findById(pointId).orElseThrow();
        return OnePointResDto
                .builder()
                .pointName(point.getPointName())
                .pointLng(point.getPointLng())
                .pointLat(point.getPointLat())
                .build();

    }
}
