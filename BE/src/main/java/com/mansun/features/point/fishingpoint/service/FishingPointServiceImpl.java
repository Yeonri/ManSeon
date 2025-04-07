package com.mansun.features.point.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.entity.fishingPoint.QFishingPoint;
import com.mansun.entity.fishingPoint.dataSet.*;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.point.fishingpoint.repository.*;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.AllPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.ForecastResDto;
import com.mansun.responseDto.fishingPoint.allPoint.SunMoonTimesResDto;
import com.mansun.responseDto.fishingPoint.allPoint.TemperatureResDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
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
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        List<FishingPoint> fishingPointList = fishingPointRepository.findAll();

        List<Long> pointIds = fishingPointList.stream()
                .map(FishingPoint::getPointId)
                .collect(Collectors.toList());

        LocalDate today = LocalDate.now();

        // 미리 SunMoonTimes 전체 조회
        Map<Long, SunMoonTimes> sunMoonMap = sunMoonTimesRepository
                .findByLocDateAndFishingPoint_PointIdIn(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        s -> s.getFishingPoint().getPointId(),
                        s -> s
                ));

        // 미리 Weather 전체 조회
        Map<Long, Weather> weatherMap = weatherRepository
                .findFirstByWeatherDateAndFishingPoint_PointIdInOrderByTmxDesc(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        w -> w.getFishingPoint().getPointId(),
                        w -> w,
                        (w1, w2) -> w1 // 중복 처리
                ));

        // 날씨 예보: 전체 포인트에 대해 한 번의 쿼리로 7일간의 Weather를 조회
        QWeather qWeather = QWeather.weather;
        QFishingPoint qFishingPoint = QFishingPoint.fishingPoint;
        QMarineZone qMarineZone = QMarineZone.marineZone;
        QObservatory qObservatory = QObservatory.observatory;

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(7);

        List<Weather> weatherList = queryFactory
                .selectFrom(qWeather)
                .leftJoin(qWeather.fishingPoint, qFishingPoint).fetchJoin()
                .leftJoin(qFishingPoint.marineZone, qMarineZone).fetchJoin()
                .leftJoin(qFishingPoint.obsCode, qObservatory).fetchJoin()
                .where(qWeather.weatherDate.between(startDate, endDate)
                        .and(qFishingPoint.pointId.in(pointIds)))
                .orderBy(qWeather.weatherDate.asc(), qWeather.weatherTime.asc())
                .distinct() // 중복 제거
                .fetch();

        // weatherList를 FishingPoint별로 그룹핑 (포인트ID -> List<Weather>)
        Map<Long, List<Weather>> forecastMap = weatherList.stream()
                .collect(Collectors.groupingBy(w -> w.getFishingPoint().getPointId()));



        return fishingPointList.stream().map(
                        fp -> {
                            Long pointId = fp.getPointId();

                            // SunMoonTimes
                            SunMoonTimes sunMoonTimes = sunMoonMap.get(pointId);
                            SunMoonTimesResDto sunMoonTimesResDto = null;
                            if (sunMoonTimes != null) {
                                sunMoonTimesResDto = SunMoonTimesResDto.builder()
                                        .sunrise(sunMoonTimes.getSunrise().atOffset(ZoneOffset.UTC))
                                        .sunset(sunMoonTimes.getSunset().atOffset(ZoneOffset.UTC))
                                        .build();
                            }
                            // Weather
                            Weather WeatherTempInfo = weatherMap.get(pointId);

                            TemperatureResDto temperatureResDto = TemperatureResDto.builder()
                                    .max(WeatherTempInfo == null ? 0 : WeatherTempInfo.getTmn())
                                    .min(WeatherTempInfo == null ? 0 : WeatherTempInfo.getTmp())
                                    .build();
//                            List<ForecastResDto> forecastResDto =
//                                    weatherList.stream().map(
//                                            wi -> ForecastResDto.builder()
//                                                    .date(LocalDateTime.of(wi.getWeatherDate(), wi.getWeatherTime().toLocalTime()).atOffset(ZoneOffset.UTC))
//                                                    .sky(wi.getSky())
//                                                    .temperature(wi.getTmp())
//                                                    .precipitation(wi.getPcp())
//                                                    .precipitation_prob(wi.getPop())
//                                                    .precipitation_type(wi.getPty())
//                                                    .humidity(wi.getReh())
//                                                    .build()
//                                    ).toList();
//                            List<TideLevel> tideLevelList = tideLevelRepository.findByObsCode_ObsCode(fp.getObsCode().getObsCode());

//                            List<TideLevelResDto> tideLevelResDto =
//                                    tideLevelList.stream().map(
//                                            tideLevel -> {
//                                                tideLevel.get
//                                            }
//                                    ).toList();
//                            List<Wave> waveList = waveHeightRepository.findByMarineZone_Lzone(fp.getMarineZone().getLzone());
//                            List<WaveResDto> waveResDtoList = waveList.stream()
//                                    .map(wl -> WaveResDto.builder()
//                                            .wave_direction(
//                                                    convertWindDirection(wl.getWaveDirection()))
//                                            .wave_height(wl.getWaveHeight())
//                                            .wind_direction(
//                                                    convertWindDirection(wl.getWindDirection()))
//                                            .wind_speed(wl.getWindSpeed())
//                                            .build())
//                                    .toList();

//                            assert temperatureMax != null;
//                            assert temperatureMin != null;
                            return AllPointResDto
                                    .builder()
                                    .pointId(fp.getPointId())
                                    .pointName(fp.getPointName())
                                    .latitude(fp.getLat())
                                    .longitude(fp.getLng())
                                    .water_depth(fp.getDepthRange())
                                    .seabed_type(fp.getPrimaryMaterial())
                                    .sunrise(sunMoonTimesResDto != null ? sunMoonTimesResDto.getSunrise() : null)
                                    .sunset(sunMoonTimesResDto != null ? sunMoonTimesResDto.getSunset() : null)
                                    .temperature_max(temperatureResDto.getMax())
                                    .temperature_min(temperatureResDto.getMin())
//                                    .weather_forecast(forecastDtoList)
//                                    .tide_info(
//                                            tideInfoList.stream().map(
//                                                    tideLevel -> {
//                                                        return TideLevelResDto
//                                                                .builder()
//
//                                                                .build();
//                                                    }
//                                            ).collect(Collectors.toList()))
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