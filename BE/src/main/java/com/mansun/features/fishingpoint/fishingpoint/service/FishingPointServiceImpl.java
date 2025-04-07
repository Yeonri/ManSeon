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
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
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

    private final JPAQueryFactory queryFactory;

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
    public List<AllPointResDto> findAllPointList(CustomUserDetails customUserDetails) {
        // 1) FishingPoint 전체 조회
        List<FishingPoint> fishingPointList = fishingPointRepository.findAll();
        SunMoonTimes sunMoon = sunMoonTimesRepository.findByLocDateAndFishingPoint_PointId(LocalDate.now(), 1L);
        // ---------------------------------
        // [A] 오늘자 SunMoonTimes & Weather
        // ---------------------------------
        LocalDate today = LocalDate.now();

        // pointId 모으기
        List<Long> pointIds = fishingPointList.stream()
                .map(FishingPoint::getPointId)
                .toList();

        // SunMoonTimes (오늘) : Map<pointId, SunMoonTimes>
        Map<Long, SunMoonTimes> sunMoonMap = sunMoonTimesRepository
                .findByLocDateAndFishingPoint_PointIdIn(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        s -> s.getFishingPoint().getPointId(),
                        s -> s
                ));

        // 오늘자 Weather 요약 : Map<pointId, Weather>
        Map<Long, Weather> weatherMap = weatherRepository
                .findFirstByWeatherDateAndFishingPoint_PointIdInOrderByTmxDesc(today, pointIds)
                .stream()
                .collect(Collectors.toMap(
                        w -> w.getFishingPoint().getPointId(),
                        w -> w,
                        (w1, w2) -> w1
                ));

        // ---------------------------------
        // [B] 3일치 Weather (예보)
        // ---------------------------------
        QWeather qWeather = QWeather.weather;
        QFishingPoint qFishingPoint = QFishingPoint.fishingPoint;

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(3);

        // 한 번에 3일치 예보 조회
        List<Weather> weatherList = queryFactory
                .selectFrom(qWeather)
                .leftJoin(qWeather.fishingPoint, qFishingPoint).fetchJoin()
                .where(qWeather.weatherDate.between(startDate, endDate)
                        .and(qFishingPoint.pointId.in(pointIds)))
                .orderBy(qWeather.weatherDate.asc(), qWeather.weatherTime.asc())
                .fetch();

        // 포인트별로 그룹핑 (pointId -> Weather List)
        Map<Long, List<Weather>> forecastMap = weatherList.stream()
                .collect(Collectors.groupingBy(w -> w.getFishingPoint().getPointId()));

        // ---------------------------------
        // [C] 3일치 TideLevel / Wave 로딩
        // ---------------------------------
        // 1) obsCode, lzone 한 번에 모으기
        List<String> obsCodes = fishingPointList.stream()
                .map(fp -> fp.getObsCode().getObsCode())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        List<Integer> lzones = fishingPointList.stream()
                .map(fp -> fp.getMarineZone().getLzone())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // 2) 3일 범위 (오늘 00:00:00 ~ +3일 23:59:59)
        LocalDateTime startDateTime = LocalDate.now().atStartOfDay();
        LocalDateTime endDateTime = LocalDate.now().plusDays(3).atTime(LocalTime.MAX);

        // 3) TideLevel 3일치 조회 -> Map(obsCode -> List<TideLevel>)
        List<TideLevel> tideLevels = tideLevelRepository.findByObsCode_ObsCodeInAndTphTimeBetween(
                obsCodes, startDateTime, endDateTime
        );
        Map<String, List<TideLevel>> tideLevelMap = tideLevels.stream()
                .collect(Collectors.groupingBy(t -> t.getObsCode().getObsCode()));

        // 4) Wave 3일치 조회 -> Map(lzone -> List<Wave>)
        List<Wave> waveList = waveHeightRepository.findByMarineZone_LzoneInAndDateTimeBetween(
                lzones, startDateTime, endDateTime
        );
        Map<String, List<Wave>> waveMap = waveList.stream()
                .collect(Collectors.groupingBy(w -> w.getMarineZone().getLzone().toString()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("mm:ss");
        // ---------------------------------
        // [D] 최종 DTO 변환
        // ---------------------------------
        return fishingPointList.stream().map(fp -> {
            // 식별자
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

            // (2) 오늘 Weather 요약 (최고/최저)



            // (3) 3일치 Weather 예보
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
                            .build())
                    .toList();

            // (4) TideLevel 3일치 -> 날짜별 최고/최저조
            List<TideLevel> tideForFp = (obsCode == null)
                    ? Collections.emptyList()
                    : tideLevelMap.getOrDefault(obsCode, Collections.emptyList());

            // 날짜별 그룹핑
            Map<LocalDate, List<TideLevel>> tideByDate = tideForFp.stream()
                    .collect(Collectors.groupingBy(t -> t.getTphTime().toLocalDate()));

            // 날짜 순으로 High/Low 뽑기
            List<TideDayResDto> tideDayResList = tideByDate.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey()) // 날짜 오름차순
                    .map(entry -> {
                        LocalDate date = entry.getKey();
                        List<TideLevel> dailyList = entry.getValue();

                        // 하루 중 최고조
                        TideLevel high = dailyList.stream()
                                .max(Comparator.comparing(TideLevel::getTphLevel))
                                .orElse(null);

                        // 하루 중 최저조
                        TideLevel low = dailyList.stream()
                                .min(Comparator.comparing(TideLevel::getTphLevel))
                                .orElse(null);

                        // 혹시 데이터가 없는 경우
                        if (high == null || low == null) {
                            return null; // 또는 제외
                        }

                        // 시각 포맷
                        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm");
                        // DTO 변환
                        TideSimpleDto highTideDto = new TideSimpleDto(
                                high.getTphLevel(),
                                high.getTphTime().format(fmt)
                        );
                        TideSimpleDto lowTideDto = new TideSimpleDto(
                                low.getTphLevel(),
                                low.getTphTime().format(fmt)
                        );

                        // 하루치 DTO
                        return new TideDayResDto(date, highTideDto, lowTideDto);
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            // (5) Wave 3일치 -> 원하는 로직대로 변환 (여기선 단순 리스트)
            List<Wave> waveForFp = (lzone == null)
                    ? Collections.emptyList()
                    : waveMap.getOrDefault(lzone, Collections.emptyList());

            // Wave도 날짜별로 묶고 싶다면 groupingBy(w -> w.getDateTime().toLocalDate()) 등을 쓰면 됨.
            // 일단 여기선 단순히 "List<WaveResDto>"
            List<WaveResDto> waveResDtoList = waveForFp.stream()
                    .map(wv -> WaveResDto.builder()
                            .wave_direction(convertWindDirection(wv.getWaveDirection()))
                            .wave_height(wv.getWaveHeight())
                            .wind_direction(convertWindDirection(wv.getWindDirection()))
                            .wind_speed(wv.getWindSpeed())
//                            .dateTime(wv.getDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                            .build())
                    .toList();

            // (6) 최종 DTO 빌드
//            assert weatherTempInfo != null;
            return AllPointResDto.builder()
                    .pointId(pointId)
                    .pointName(fp.getPointName())
                    .latitude(fp.getLat())
                    .longitude(fp.getLng())
                    .water_depth(fp.getDepthRange())
                    .seabed_type(fp.getPrimaryMaterial())
                    .sunrise(sunMoonDto != null ? sunMoonDto.getSunrise().toLocalDateTime().format(formatter) : null)
                    .sunset(sunMoonDto != null ? sunMoonDto.getSunset().toLocalTime().format(formatter) : null)
//                    .temperature_max()
//                    .temperature_min()
                    .weather_forecast(forecastResDtoList)
                    // 조위: 3일치 날짜별 High/Low
                    .tide_info(tideDayResList)
                    // Wave: 3일치
//                    .wave_info(waveResDtoList)
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