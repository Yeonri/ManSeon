package com.mansun.features.fishingpoint.fishingpoint.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import com.mansun.entity.fishingPoint.QFishingPoint;
import com.mansun.entity.fishingPoint.dataSet.*;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.fishingpoint.fishingpoint.repository.*;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.responseDto.fishingPoint.OnePointDetailInfoResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPoint.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

        // 1) FishingPoint 전체 조회
        List<FishingPoint> fishingPointList = fishingPointRepository.findAll();

        // -----------------------------
        // [A] SunMoonTimes, Weather (오늘 데이터) 미리 로딩
        // -----------------------------
        LocalDate today = LocalDate.now();

        // 1-A) 전체 pointId 추출
        List<Long> pointIds = fishingPointList.stream()
                .map(FishingPoint::getPointId)
                .toList();

        // 1-B) SunMoonTimes 한 번에 조회 → Map(pointId -> SunMoonTimes)
        Map<Long, SunMoonTimes> sunMoonMap = sunMoonTimesRepository
                .findByLocDateAndFishingPoint_PointIdIn(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        s -> s.getFishingPoint().getPointId(),
                        s -> s
                ));

        // 1-C) Weather (오늘자) 한 번에 조회 → Map(pointId -> Weather)
        Map<Long, Weather> weatherMap = weatherRepository
                .findFirstByWeatherDateAndFishingPoint_PointIdInOrderByTmxDesc(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        w -> w.getFishingPoint().getPointId(),
                        w -> w,
                        (w1, w2) -> w1 // 중복 키가 있을 경우 첫 번째로 들어온 값 유지
                ));

        // -----------------------------
        // [B] 3일치 Weather (예보) 미리 로딩
        // -----------------------------
        QWeather qWeather = QWeather.weather;
        QFishingPoint qFishingPoint = QFishingPoint.fishingPoint;

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(3); // 예시로 3일만. 7일도 동일한 로직

        // 한 번에 3일치 예보 조회
        List<Weather> weatherList = queryFactory
                .selectFrom(qWeather)
                .leftJoin(qWeather.fishingPoint, qFishingPoint).fetchJoin()
                .where(qWeather.weatherDate.between(startDate, endDate)
                        .and(qFishingPoint.pointId.in(pointIds)))
                .orderBy(qWeather.weatherDate.asc(), qWeather.weatherTime.asc())
                .fetch();

        // 포인트별로 그룹핑 (pointId -> 해당 포인트의 Weather List)
        Map<Long, List<Weather>> forecastMap = weatherList.stream()
                .collect(Collectors.groupingBy(w -> w.getFishingPoint().getPointId()));

        // -----------------------------
        // [C] TideLevel / Wave (N+1 방지)
        // -----------------------------
        // 1) FishingPoint에서 obsCode, lzone 추출
        List<String> obsCodes = fishingPointList.stream()
                .map(fp -> fp.getObsCode().getObsCode()) // fp.getObsCode()가 null이 아니라고 가정
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // lzone을 Integer → String 으로 변환 예시
        // (Wave 테이블에서 PK/FK를 int로 쓴다면 그대로 int를 쓸 수도 있음)
        List<String> lzones = fishingPointList.stream()
                .map(fp -> fp.getMarineZone().getLzone().toString())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // 2) TideLevel 한 번에 조회 → Map(obsCode -> List<TideLevel>)
        List<TideLevel> tideLevels = tideLevelRepository.findByObsCode_ObsCodeIn(obsCodes);
        // 예: findByObsCodeIn(List<String> obsCodes)
        // → TideLevel 엔티티 내 obsCode 필드 기준

        Map<String, List<TideLevel>> tideLevelMap = tideLevels.stream()
                .collect(Collectors.groupingBy(t -> t.getObsCode().getObsCode()));
//
        // 3) Wave 한 번에 조회 → Map(lzone -> List<Wave>)
        List<Wave> waveList = waveHeightRepository.findByMarineZone_LzoneIn(lzones);
        // 예: findByMarineZone_LzoneIn(List<String> lzones)

        Map<String, List<Wave>> waveMap = waveList.stream()
                .collect(Collectors.groupingBy(w -> w.getMarineZone().getLzone().toString()));

        // -----------------------------
        // [D] 최종 DTO 변환 (stream)
        // -----------------------------
        return fishingPointList.stream().map(fp -> {
            Long pointId = fp.getPointId();
            String obsCode = fp.getObsCode() != null ? fp.getObsCode().getObsCode() : null;
            String lzone = fp.getMarineZone() != null
                    ? fp.getMarineZone().getLzone().toString()
                    : null;

            // (1) SunMoonTimes
            SunMoonTimes sunMoonTimes = sunMoonMap.get(pointId);
            SunMoonTimesResDto sunMoonDto = null;
            if (sunMoonTimes != null) {
                sunMoonDto = SunMoonTimesResDto.builder()
                        .sunrise(sunMoonTimes.getSunrise().atOffset(ZoneOffset.UTC))
                        .sunset(sunMoonTimes.getSunset().atOffset(ZoneOffset.UTC))
                        .build();
            }

            // (2) 오늘 Weather 요약 (예: 최고/최저온도)
            Weather weatherTempInfo = weatherMap.get(pointId);
            TemperatureResDto temperatureResDto = TemperatureResDto.builder()
                    .max(weatherTempInfo == null ? 0 : weatherTempInfo.getTmn())
                    .min(weatherTempInfo == null ? 0 : weatherTempInfo.getTmp())
                    .build();

            // (3) 3일 예보 정보 (위에서 만든 forecastMap)
            List<Weather> forecastList = forecastMap.getOrDefault(pointId, Collections.emptyList());
            List<ForecastResDto> forecastResDtoList = forecastList.stream()
                    .map(wi -> ForecastResDto.builder()
                            .date(LocalDateTime.of(wi.getWeatherDate(), wi.getWeatherTime().toLocalTime())
                                    .atOffset(ZoneOffset.UTC))
                            .sky(wi.getSky())
                            .temperature(wi.getTmp())
                            .precipitation(wi.getPcp())
                            .precipitation_prob(wi.getPop())
                            .precipitation_type(wi.getPty())
                            .humidity(wi.getReh())
                            .build()
                    )
                    .toList();

            // (4) TideLevel
            // obsCode가 null이거나 tideLevelMap에 없으면 빈 리스트
            List<TideLevel> tideLevelForFp = obsCode == null
                    ? Collections.emptyList()
                    : tideLevelMap.getOrDefault(obsCode, Collections.emptyList());

            List<TideLevelResDto> tideLevelResDto = tideLevelForFp.stream()
                    .map(tide -> TideLevelResDto.builder()
                            .tphTime(tide.getTphTime().atOffset(ZoneOffset.UTC))  // DATETIME → Offset
                            .hlCode(tide.getHlCode())      // 'High/Low' 코드
                            .tphLevel(tide.getTphLevel())  // 수위값
                            .build())
                    .toList();

            // (5) Wave
            List<Wave> waveForFp = (lzone == null)
                    ? Collections.emptyList()
                    : waveMap.getOrDefault(lzone, Collections.emptyList());

            List<WaveResDto> waveResDtoList = waveForFp.stream()
                    .map(wv -> WaveResDto.builder()
                            .wave_direction(convertWindDirection(wv.getWaveDirection()))
                            .wave_height(wv.getWaveHeight())
                            .wind_direction(convertWindDirection(wv.getWindDirection()))
                            .wind_speed(wv.getWindSpeed())
                            .build())
                    .toList();

            // (6) 결과 DTO 빌드
            return AllPointResDto.builder()
                    .pointId(pointId)
                    .pointName(fp.getPointName())
                    .latitude(fp.getLat())
                    .longitude(fp.getLng())
                    .water_depth(fp.getDepthRange())
                    .seabed_type(fp.getPrimaryMaterial())
                    .sunrise(sunMoonDto != null ? sunMoonDto.getSunrise() : null)
                    .sunset(sunMoonDto != null ? sunMoonDto.getSunset() : null)
                    .temperature_max(temperatureResDto.getMax())
                    .temperature_min(temperatureResDto.getMin())
                    .weather_forecast(forecastResDtoList)
                    .tide_info(tideLevelResDto)
                    .build();
        }).collect(Collectors.toList());
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