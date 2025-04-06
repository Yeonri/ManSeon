package com.mansun.features.point.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.point.fishingpoint.repository.*;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.ForecastResDto;
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
    private final WaveHeightRepository waveHeightRepository;

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

    private String convertWindDirection(double degree) {
        if (degree >= 337.5 || degree < 22.5) {
            return "북";
        } else if (degree < 67.5) {
            return "북동";
        } else if (degree < 112.5) {
            return "동";
        } else if (degree < 157.5) {
            return "남동";
        } else if (degree < 202.5) {
            return "남";
        } else if (degree < 247.5) {
            return "남서";
        } else if (degree < 292.5) {
            return "서";
        } else {
            return "북서";
        }
    }

    //전체 포인트 리스트
    @Override
    public List<AllPointResDto> findAllPointList(CustomUserDetails customUserDetails) {
        List<FishingPoint> fishingPointList = fishingPointRepository.findAll();
        SunMoonTimes sunMoon = sunMoonTimesRepository.findByLocDateAndFishingPoint_PointId(LocalDate.now(), 1L);
        return fishingPointList.stream().map(
                        fp -> AllPointResDto
                                .builder()
                                .pointId(fp.getPointId())
                                .pointName(fp.getPointName())
                                .latitude(fp.getLat())
                                .longitude(fp.getLng())
                                .water_depth(fp.getDepthRange())
                                .seabed_type(fp.getPrimaryMaterial())
//                                .sunrise(sunMoon.getSunrise())
//                                .sunset(sunMoon.getSunset())
//                                .temperature_max(
//                                        weatherRepository
//                                                .findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmxDesc(LocalDate.now(), fp.getPointId()).getTmx())
//                                .temperature_min(
//                                        weatherRepository
//                                                .findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmnAsc(LocalDate.now(), fp.getPointId()).getTmn())
//                                .weather_forecast(
//                                        weatherRepository
//                                                .findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate.now(), LocalDate.now().plusDays(7), fp.getPointId())
//                                                .stream()
//                                                .map(weather ->
//                                                        ForecastResDto.builder()
//                                                                .date(weather.getWeatherDate())
//                                                                .time(weather.getWeatherTime().toLocalTime())
//                                                                .temperature(weather.getTmp())
//                                                                .precipitation(weather.getPcp().equals("강수없음") ? 0 : Double.parseDouble(weather.getPcp()))
//                                                                .precipitation_prob(weather.getPop())
//                                                                .humidity(weather.getReh())
//                                                                .sky(weather.getSky())
//                                                                .wind_direction(convertWindDirection(
//                                                                        waveHeightRepository
//                                                                                .findFirstByMarineZone_LzoneAndDateTime(
//                                                                                        fp.getMarineZone().getLzone(),
//                                                                                        LocalDateTime.of(weather.getWeatherDate(), weather.getWeatherTime().toLocalTime())
//                                                                                ).orElseThrow().getWindDirection())
//                                                                )
//                                                                .wind_speed(
//                                                                        waveHeightRepository
//                                                                                .findFirstByMarineZone_LzoneAndDateTime(
//                                                                                        fp.getMarineZone().getLzone(),
//                                                                                        LocalDateTime.of(weather.getWeatherDate(), weather.getWeatherTime().toLocalTime())
//                                                                                ).orElseThrow().getWindSpeed())
//                                                                .wave_height(
//                                                                        waveHeightRepository
//                                                                                .findFirstByMarineZone_LzoneAndDateTime(
//                                                                                        fp.getMarineZone().getLzone(),
//                                                                                        LocalDateTime.of(weather.getWeatherDate(), weather.getWeatherTime().toLocalTime())
//                                                                                ).orElseThrow().getWaveHeight())
//                                                                .water_temperature(waveHeightRepository
//                                                                        .findFirstByMarineZone_LzoneAndDateTime(
//                                                                                fp.getMarineZone().getLzone(),
//                                                                                LocalDateTime.of(weather.getWeatherDate(), weather.getWeatherTime().toLocalTime())
//                                                                        ).orElseThrow().getWaveHeight())
//                                                                .wave_direction(
//                                                                        convertWindDirection(
//                                                                                waveHeightRepository
//                                                                                        .findFirstByMarineZone_LzoneAndDateTime(
//                                                                                                fp.getMarineZone().getLzone(),
//                                                                                                LocalDateTime.of(weather.getWeatherDate(), weather.getWeatherTime().toLocalTime())
//                                                                                        ).orElseThrow().getWaveDirection()))
//                                                                .precipitation_type(weather.getPty())
//                                                                .build()
//                                                )
//                                                .collect(Collectors.toList())
//                                )
//                                .tide_info(fp.getObsCode().getTideLevel())
//                                .caught_fish_summary(fishRepository.findByUser_UserId(customUserDetails.getUserId()))
                                .build())
                .collect(Collectors.toList());
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

    private static class todaySunmoon {
        LocalDateTime sunrise;
        LocalDateTime sunset;
    }
}