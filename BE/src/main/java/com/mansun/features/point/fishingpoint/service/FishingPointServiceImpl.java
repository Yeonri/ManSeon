package com.mansun.features.point.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Wave;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.point.fishingpoint.repository.*;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.CaughtFishResDto;
import com.mansun.responseDto.fishingPoint.allPoint.ForecastResDto;
import com.mansun.responseDto.fishingPoint.allPoint.TideLevelResDto;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
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
                        fp -> {
                            SunMoonTimes sunmoon = sunMoonTimesRepository.findByLocDateAndFishingPoint_PointId(LocalDate.now(), fp.getPointId());
                            LocalDateTime sunrise = sunmoon.getSunrise();
                            LocalDateTime sunset = sunmoon.getSunset();

                            Weather maxTempWeather = weatherRepository
                                    .findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmxDesc(LocalDate.now(), fp.getPointId());
                            Weather minTempWeather = weatherRepository
                                    .findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmnAsc(LocalDate.now(), fp.getPointId());

                            Double temperatureMax = (maxTempWeather != null)
                                    ? (double) maxTempWeather.getTmx()
                                    : null;
                            Double temperatureMin = (minTempWeather != null)
                                    ? (double) minTempWeather.getTmn()
                                    : null;

                            // (3) 일주일치 날씨 예보 (간단히 예시만)
//                            List<Weather> weatherList = weatherRepository
//                                    .findByWeatherDateBetweenAndFishingPoint_PointId(
//                                            LocalDate.now(), LocalDate.now().plusDays(7), fp.getPointId());
//
//                            List<ForecastResDto> forecastDtoList = weatherList.stream()
//                                    .map(w -> {
//                                        // 예시로 WaveHeight도 함께 조회 (Optional 처리)
//                                        LocalDateTime dateTime = LocalDateTime.of(w.getWeatherDate(), w.getWeatherTime().toLocalTime());
//                                        Wave wave = waveHeightRepository
//                                                .findFirstByMarineZone_LzoneAndDateTime(fp.getMarineZone().getLzone(), dateTime)
//                                                .orElse(null);
//
//                                        // Weather + WaveHeight -> WeatherForecastDto 변환
//                                        return ForecastResDto.builder()
//                                                .date(w.getWeatherDate())
//                                                .temperature(w.getTmp())
//                                                .humidity(w.getReh())
//                                                .precipitation_prob(w.getPop())
//                                                .sky(w.getSky())
//                                                .wind_speed(wave != null ? wave.getWindSpeed() : 0.0)
//                                                .wave_height(wave != null ? wave.getWaveHeight() : 0.0)
//                                                // ... 등등 필요한 필드를 채움 ...
//                                                .build();
//                                    })
//                                    .collect(Collectors.toList());

                            List<TideLevelResDto> tideInfoList = fp.getObsCode().getTideLevel()
                                    .stream()
                                    .map(tideLevel -> {
                                        return TideLevelResDto
                                                .builder()
                                                .tphTime(tideLevel.getTphTime().atOffset(ZoneOffset.UTC))
                                                .tphLevel(tideLevel.getTphLevel())
                                                .hlCode(tideLevel.getHlCode())
                                                .build();
                                    })
                                    .toList();
                            // (5) 잡힌 물고기 요약
//                            List<CaughtFishResDto> caughtFishSummary = getCaughtFishSummary(customUserDetails, fp);


                            assert temperatureMax != null;
                            assert temperatureMin != null;
                            return AllPointResDto
                                    .builder()
                                    .pointId(fp.getPointId())
                                    .pointName(fp.getPointName())
                                    .latitude(fp.getLat())
                                    .longitude(fp.getLng())
                                    .water_depth(fp.getDepthRange())
                                    .seabed_type(fp.getPrimaryMaterial())
                                    .sunrise(sunmoon.getSunrise().atOffset(ZoneOffset.UTC))
                                    .sunset(sunmoon.getSunset().atOffset(ZoneOffset.UTC))
                                    .temperature_max(temperatureMax.floatValue())
                                    .temperature_min(temperatureMin.floatValue())
//                                    .weather_forecast(forecastDtoList)
                                    .tide_info(
                                            tideInfoList.stream().map(
                                                    tideLevel -> {
                                                        return TideLevelResDto
                                                                .builder()

                                                                .build();
                                                    }
                                            ).collect(Collectors.toList()))
//                                    .caught_fish_summary(caughtFishSummary)
                                    .build();
                        })
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