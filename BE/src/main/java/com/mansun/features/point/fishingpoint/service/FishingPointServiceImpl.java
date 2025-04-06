package com.mansun.features.point.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.point.fishingpoint.repository.FishingPointRepository;
import com.mansun.features.point.fishingpoint.repository.SunMoonTimesRepository;
import com.mansun.features.point.fishingpoint.repository.TideLevelRepository;
import com.mansun.features.point.fishingpoint.repository.WeatherRepository;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FishingPointServiceImpl implements FishingPointService {
    private final EntityManager em;

    private final FishingPointRepository fishingPointRepository;
    private final TideLevelRepository tideLevelRepository;
    private final FishRepository fishRepository;
    private final WeatherRepository weatherRepository;
    private final SunMoonTimesRepository sunMoonTimesRepository;

    //포인트 명에 따른 검색 기능
    @Override
    public SearchPointResDto searchFishingPointList(
            CustomUserDetails customUserDetails,
            String pointName
    ) {
        FishingPoint fishingPoint =
                fishingPointRepository.findFishingPointsByPointNameContaining(pointName);
        return SearchPointResDto
                .builder()
                .pointId(fishingPoint.getPointId())
                .pointName(fishingPoint.getPointName())
                .build();
    }

    @Override
    public void createAllPoint(CreateFishingPointReqDto req) {
        fishingPointRepository.save(
                FishingPoint.builder()
                        .pointName(req.getPointName())
                        .lng(req.getPointLng())
                        .lat(req.getPointLat())
                        .build()
        );
    }

    private static class todaySunmoon{
        LocalDateTime sunrise;
        LocalDateTime sunset;
    }

    //전체 포인트 리스트
    @Override
    public List<AllPointResDto> findAllPointList() {
        List<FishingPoint> fishingPointList = fishingPointRepository.findAll();
//        List<Weather> weatherForecast=weatherRepository.findAllByWeatherDateBetweenAndFishingPoint_PointId(LocalDateTime.now(),LocalDateTime.now().plusDays(7),);
//        SunMoonTimes sunMoonTimes=sunMoonTimesRepository.findSunMoonTimesByLocDateAndFishingPoint_PointId(LocalDate.now(),);
        return fishingPointList.stream().map(
                fp -> AllPointResDto
                        .builder()
                        .pointId(fp.getPointId())
                        .pointName(fp.getPointName())
                        .latitude(fp.getLat())
                        .longitude(fp.getLng())
                        .water_depth(fp.getDepthRange())
                        .seabed_type(fp.getPrimaryMaterial())
//                        .sunrise(sunMoonTimes.getSunrise())
//                        .sunset(sunMoonTimes.getSunset())
//                        .temperature_max(fp)
//                        .temperature_min()
//                        .weather_forecast(weatherForecast)
//                        .tide_info()
//                        .caught_fish_summary()
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public OnePointResDto findOnePoint(Long pointId) {
        FishingPoint point = fishingPointRepository.findById(pointId).orElseThrow();
        return OnePointResDto
                .builder()
                .pointName(point.getPointName())
                .pointLng(point.getLng())
                .pointLat(point.getLat())
                .build();
    }

    @Override
    public OnePointDetailInfoResDto findOnePointDetailInfo(CustomUserDetails customUserDetails, Long pointId) {
        //날씨
        List<Weather> weatherList = weatherRepository.findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate.now(), LocalDate.now().plusDays(7), pointId);
        //조위
        String obsCode = fishingPointRepository.findById(pointId).orElseThrow().getObsCode().getObsCode();
        List<TideLevel> tideLevelList = tideLevelRepository.findByObsCode_ObsCode(obsCode);
        //물고기
        List<Fish> myFishList = fishRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        return OnePointDetailInfoResDto.builder()
                .myWeatherList(weatherList)
                .myTideLevelList(tideLevelList)
                .myFishList(myFishList)
                .build();
    }
}