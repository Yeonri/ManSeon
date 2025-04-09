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
import com.mansun.responseDto.fishingPoint.forecastOnePointResDto;
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
    public List<SearchPointResDto> searchFishingPointList(
            CustomUserDetails customUserDetails,
            String pointName
    ) {
        List<FishingPoint> fishingPoint =
                fishingPointRepository.findFishingPointsByPointNameContainingOrderByPointName(pointName).orElseThrow();
        return fishingPoint.stream().map(
                fp-> SearchPointResDto
                        .builder()
                        .pointId(fp.getPointId())
                        .pointName(fp.getPointName())
                        .lat(fp.getLat())
                        .lng(fp.getLng())
                        .build()
        ).collect(Collectors.toList());
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

    public List<FishingPoint> getAllPointResDtoList() {
        return fishingPointRepository.findAll();
    }

    public SunMoonTimes getSunMoonTimes() {
        return sunMoonTimesRepository.findByLocDateAndFishingPoint_PointId(LocalDate.now(), 1L);
    }

    //전체 포인트 리스트
    public List<AllPointResDto> findAllPointList(CustomUserDetails customUserDetails) {
        // 1) FishingPoint 전체 조회
        List<FishingPoint> fishingPointList = getAllPointResDtoList();

        // 오늘 날짜
        LocalDate today = LocalDate.now();

        Map<Long, LocalTime> sunriseMap = new HashMap<>();
        Map<Long, LocalTime> sunsetMap = new HashMap<>();
        List<SunMoonTimes> sunMoonTimesList =
                sunMoonTimesRepository.findByLocDateOrderByFishingPointAsc(LocalDate.of(2025, 3, 25)).orElseThrow();

        for (SunMoonTimes sm : sunMoonTimesList) {
            sunriseMap.put(sm.getFishingPoint().getPointId(), sm.getSunrise());
            sunsetMap.put(sm.getFishingPoint().getPointId(), sm.getSunset());
        }

        //포인트별 오늘의 최저,최고 기온
        //        이거 지금 3/25의 전체를 가져오는 것 pointId,
        List<Weather> TodayTemperatureList =
                weatherRepository
                        .findByWeatherDateOrderByFishingPoint(
                                LocalDate.of(2025, 3, 25)
                        ).orElseThrow();
        Map<Long, TemperatureResDto> dayTemperature = new HashMap<>();
        for (Weather w : TodayTemperatureList) {
            dayTemperature.put(w.getFishingPoint().getPointId(), new TemperatureResDto());
        }

        for (Weather w : TodayTemperatureList) {
            TemperatureResDto temp =
                    dayTemperature.get(w.getFishingPoint().getPointId());
            if (temp.getMax() < w.getTmp()) {
                temp.setMax(w.getTmp());
            }
            if (temp.getMin() > w.getTmp()) {
                temp.setMin(w.getTmp());
            }
            dayTemperature.replace(w.getFishingPoint().getPointId(), temp);

        }

//        for (Long aLong : dayTemperature.keySet()) {
//            System.out.println(dayTemperature.get(aLong).getMax() + " " + dayTemperature.get(aLong).getMin());
//        }

//        // pointId 리스트
//        List<Long> pointIds = fishingPointList.stream()
//                .map(FishingPoint::getPointId)
//                .toList();
//
//        // ------------------------------------------------------------------------------
//        // [B] 3일치 Weather (예보)
//        // ------------------------------------------------------------------------------
//        QWeather qWeather = QWeather.weather;
//        QFishingPoint qFishingPoint = QFishingPoint.fishingPoint;
//
//        LocalDate startDate = LocalDate.of(2025, 3, 25);
//        LocalDate endDate = startDate.plusDays(3);
//
//        // 한 번에 3일치 예보 조회
//        List<Weather> weatherList = queryFactory
//                .selectFrom(qWeather)
//                .leftJoin(qWeather.fishingPoint, qFishingPoint).fetchJoin()
//                .where(qWeather.weatherDate.between(startDate, endDate)
//                        .and(qFishingPoint.pointId.in(pointIds)))
//                .orderBy(qWeather.weatherDate.asc(), qWeather.weatherTime.asc())
//                .fetch();
//
//        // 포인트별 그룹: pointId -> List<Weather>
//        Map<Long, List<Weather>> forecastMap = weatherList.stream()
//                .collect(Collectors.groupingBy(w -> w.getFishingPoint().getPointId()));
//
//        // ------------------------------------------------------------------------------
//        // [C] 3일치 TideLevel / Wave 로딩
//        // ------------------------------------------------------------------------------
//        // 1) obsCode / lzone 모으기
//        List<String> obsCodes = fishingPointList.stream()
//                .map(fp -> fp.getObsCode() == null ? null : fp.getObsCode().getObsCode())
//                .filter(Objects::nonNull)
//                .distinct()
//                .toList();
//
//        List<Integer> lzones = fishingPointList.stream()
//                .map(fp -> fp.getMarineZone() == null ? null : fp.getMarineZone().getLzone())
//                .filter(Objects::nonNull)
//                .distinct()
//                .toList();
//
//        // 2) 3일 범위
//        LocalDateTime startDateTime = LocalDate.of(2025, 3, 25).atStartOfDay();
//        LocalDateTime endDateTime = LocalDate.of(2025, 3, 25).atTime(LocalTime.MAX);
//
//        // 3) TideLevel 3일치 조회 -> Map(obsCode -> List<TideLevel>)
//        List<TideLevel> tideLevels = tideLevelRepository.findByObsCode_ObsCodeInAndTphTimeBetween(
//                obsCodes, startDateTime, endDateTime
//        );
//        Map<String, List<TideLevel>> tideLevelMap = tideLevels.stream()
//                .collect(Collectors.groupingBy(t -> t.getObsCode().getObsCode()));
//
//        // 4) Wave 3일치 조회 -> Map("lzone문자열" -> List<Wave>)
//        List<Wave> waveList = waveHeightRepository.findByMarineZone_LzoneInAndDateTimeBetween(
//                lzones, startDateTime, endDateTime
//        );
//        Map<String, List<Wave>> waveMap = waveList.stream()
//                .collect(Collectors.groupingBy(w -> w.getMarineZone().getLzone().toString()));
//
//        // ------------------------------------------------------------------------------
//        // [D] 최종 DTO 변환
//        // ------------------------------------------------------------------------------
//        // 예: 'yyyy-MM-dd HH:mm:ss' 포맷 (원하는 형태로 바꾸시면 됩니다)
//        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return fishingPointList.stream().map(fp -> {
            // (1) 기본 식별자 / 지역 정보
            Long pointId = fp.getPointId();
//            String obsCode = (fp.getObsCode() != null) ? fp.getObsCode().getObsCode() : null;
//            String lzoneStr = (fp.getMarineZone() != null)
//                    ? fp.getMarineZone().getLzone().toString()
//                    : null;
//
            TemperatureResDto temperatureResDto = dayTemperature.get(fp.getPointId());
//
//            // (4) 3일치 Weather (예보)
//            List<Weather> forecastList = forecastMap.getOrDefault(pointId, Collections.emptyList());
//            List<ForecastResDto> forecastResDtoList = forecastList.stream()
//                    .map(wi -> ForecastResDto.builder()
//                            .date(LocalDateTime.of(wi.getWeatherDate(),
//                                    wi.getWeatherTime()).atOffset(ZoneOffset.UTC))
//                            .sky(wi.getSky())
//                            .temperature(wi.getTmp())
//                            .precipitation(wi.getPcp())
//                            .precipitation_prob(wi.getPop())
//                            .precipitation_type(wi.getPty())
//                            .humidity(wi.getReh())
//                            .build())
//                    .toList();
//
//            // (5) 3일치 TideLevel -> 날짜별 최고/최저 조
//            List<TideLevel> tideForFp = (obsCode == null)
//                    ? Collections.emptyList()
//                    : tideLevelMap.getOrDefault(obsCode, Collections.emptyList());
//
//            Map<LocalDate, List<TideLevel>> tideByDate = tideForFp.stream()
//                    .collect(Collectors.groupingBy(t -> t.getTphTime().toLocalDate()));
//
//            List<TideDayResDto> tideDayResList = tideByDate.entrySet().stream()
//                    .sorted(Map.Entry.comparingByKey()) // 날짜 오름차순
//                    .map(entry -> {
//                        LocalDate date = entry.getKey();
//                        List<TideLevel> dailyList = entry.getValue();
//                        if (dailyList.isEmpty()) return null;
//
//                        // 하루 중 최고조
//                        TideLevel high = dailyList.stream()
//                                .max(Comparator.comparing(TideLevel::getTphLevel))
//                                .orElse(null);
//                        // 하루 중 최저조
//                        TideLevel low = dailyList.stream()
//                                .min(Comparator.comparing(TideLevel::getTphLevel))
//                                .orElse(null);
//
//                        if (high == null || low == null) {
//                            return null;
//                        }
//
//                        // 시각 포맷은 "HH:mm"
//                        DateTimeFormatter tideTimeFmt = DateTimeFormatter.ofPattern("HH:mm");
//                        TideSimpleDto highTideDto = new TideSimpleDto(
//                                high.getTphLevel(),
//                                high.getTphTime().format(tideTimeFmt)
//                        );
//                        TideSimpleDto lowTideDto = new TideSimpleDto(
//                                low.getTphLevel(),
//                                low.getTphTime().format(tideTimeFmt)
//                        );
//
//                        return new TideDayResDto(date, highTideDto, lowTideDto);
//                    })
//                    .filter(Objects::nonNull)
//                    .collect(Collectors.toList());
//
//            // (6) Wave 3일치
//            List<Wave> waveForFp = (lzoneStr == null)
//                    ? Collections.emptyList()
//                    : waveMap.getOrDefault(lzoneStr, Collections.emptyList());
//
//            // Wave DTO 리스트
//            List<WaveResDto> waveResDtoList = waveForFp.stream()
//                    .map(wv -> WaveResDto.builder()
//                            .wave_direction(convertWindDirection(wv.getWaveDirection()))
//                            .wave_height(wv.getWaveHeight())
//                            .wind_direction(convertWindDirection(wv.getWindDirection()))
//                            .wind_speed(wv.getWindSpeed())
//                            // 날짜/시간 포맷 (필요하다면)
////                            .dateTime(wv.getDateTime().format(dateTimeFormatter))
//                            .build())
//                    .toList();
//
//            // (6-1) wave_level(평균 파고) 예시
//            Double averageWaveHeight = waveForFp.stream()
//                    .map(Wave::getWaveHeight)
//                    .filter(Objects::nonNull)
//                    .mapToDouble(Double::doubleValue)
//                    .average()
//                    .orElse(0.0);

            // (7) 최종 DTO
            return AllPointResDto.builder()
                    .pointId(pointId)
                    .pointName(fp.getPointName())
                    .latitude(fp.getLat())
                    .longitude(fp.getLng())
                    .water_depth(fp.getDepthRange())
                    .seabed_type(fp.getPrimaryMaterial())

                    // sunrise, sunset
                    .sunrise(sunriseMap.get(fp.getPointId()).getMinute() + ":" + sunriseMap.get(fp.getPointId()).getSecond())
                    .sunset(sunsetMap.get(fp.getPointId()).getMinute() + ":" + sunsetMap.get(fp.getPointId()).getSecond())

                    // 오늘자 최고/최저 기온
                    .temperature_max(temperatureResDto == null ? 0 : temperatureResDto.getMax())
                    .temperature_min(temperatureResDto == null ? 0 : temperatureResDto.getMin())

//                    // 3일치 Weather
//                    .weather_forecast(forecastResDtoList)
//
//                    // 조위: 3일치 날짜별 High/Low
//                    .tide_info(tideDayResList)
//
//                    // 파고 리스트
//                    .wave_info(waveResDtoList)

                    // 파고 단일값(평균) - AllPointResDto에 필드가 있어야 함 (예: wave_level)
//                    .wave_level(averageWaveHeight)

                    .build();
        }).collect(Collectors.toList());
    }

    public forecastOnePointResDto forecastOnePointInfo(
            CustomUserDetails customUserDetails, Long pointId
    ) {
        // 1) FishingPoint 전체 조회
        List<FishingPoint> fishingPointList = getAllPointResDtoList();


        List<String> obsCodes = fishingPointList.stream()
                .map(fp -> fp.getObsCode() == null ? null : fp.getObsCode().getObsCode())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        List<Integer> lzones = fishingPointList.stream()
                .map(fp -> fp.getMarineZone() == null ? null : fp.getMarineZone().getLzone())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // 2) 3일 범위
        LocalDateTime startDateTime = LocalDate.of(2025, 3, 25).atStartOfDay();
        LocalDateTime endDateTime = LocalDate.of(2025, 3, 25).atTime(LocalTime.MAX);

        // 3) TideLevel 3일치 조회 -> Map(obsCode -> List<TideLevel>)
        List<TideLevel> tideLevels = tideLevelRepository.findByObsCode_ObsCodeInAndTphTimeBetween(
                obsCodes, startDateTime, endDateTime
        );
        Map<String, List<TideLevel>> tideLevelMap = tideLevels.stream()
                .collect(Collectors.groupingBy(t -> t.getObsCode().getObsCode()));

        // 4) Wave 3일치 조회 -> Map("lzone문자열" -> List<Wave>)
        List<Wave> waveList = waveHeightRepository.findByMarineZone_LzoneInAndDateTimeBetween(
                lzones, startDateTime, endDateTime
        );
        Map<String, List<Wave>> waveMap = waveList.stream()
                .collect(Collectors.groupingBy(w -> w.getMarineZone().getLzone().toString()));


        FishingPoint fp = fishingPointRepository.findById(pointId).orElseThrow();
// (1) 기본 식별자 / 지역 정보
        String obsCode = (fp.getObsCode() != null) ? fp.getObsCode().getObsCode() : null;
        String lzoneStr = (fp.getMarineZone() != null)
                ? fp.getMarineZone().getLzone().toString()
                : null;
        QWeather qWeather = QWeather.weather;
        QFishingPoint qFishingPoint = QFishingPoint.fishingPoint;

        LocalDate startDate = LocalDate.of(2025, 3, 25);
        LocalDate endDate = startDate.plusDays(3);

        // pointId 리스트
        List<Long> pointIds = fishingPointList.stream()
                .map(FishingPoint::getPointId)
                .toList();
        // 한 번에 3일치 예보 조회
        List<Weather> weatherList = queryFactory
                .selectFrom(qWeather)
                .leftJoin(qWeather.fishingPoint, qFishingPoint).fetchJoin()
                .where(qWeather.weatherDate.between(startDate, endDate)
                        .and(qFishingPoint.pointId.in(pointIds)))
                .orderBy(qWeather.weatherDate.asc(), qWeather.weatherTime.asc())
                .fetch();
        // 포인트별 그룹: pointId -> List<Weather>
        Map<Long, List<Weather>> forecastMap = weatherList.stream()
                .collect(Collectors.groupingBy(w -> w.getFishingPoint().getPointId()));

        // (4) 3일치 Weather (예보)
        List<Weather> forecastList = forecastMap.getOrDefault(pointId, Collections.emptyList());
        List<ForecastResDto> forecastResDtoList = forecastList.stream()
                .map(wi -> ForecastResDto.builder()

                        .date(LocalDateTime.of(wi.getWeatherDate(),
                                wi.getWeatherTime()).atOffset(ZoneOffset.UTC))
                        .sky(wi.getSky())
                        .temperature(wi.getTmp())
                        .precipitation(wi.getPcp())
                        .precipitation_prob(wi.getPop())
                        .precipitation_type(wi.getPty())
                        .humidity(wi.getReh())
                        .build())
                .toList();

        // (5) 3일치 TideLevel -> 날짜별 최고/최저 조
        List<TideLevel> tideForFp = (obsCode == null)
                ? Collections.emptyList()
                : tideLevelMap.getOrDefault(obsCode, Collections.emptyList());

        Map<LocalDate, List<TideLevel>> tideByDate = tideForFp.stream()
                .collect(Collectors.groupingBy(t -> t.getTphTime().toLocalDate()));

        List<TideDayResDto> tideDayResList = tideByDate.entrySet().stream()
                .sorted(Map.Entry.comparingByKey()) // 날짜 오름차순
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<TideLevel> dailyList = entry.getValue();
                    if (dailyList.isEmpty()) return null;

                    // 하루 중 최고조
                    TideLevel high = dailyList.stream()
                            .max(Comparator.comparing(TideLevel::getTphLevel))
                            .orElse(null);
                    // 하루 중 최저조
                    TideLevel low = dailyList.stream()
                            .min(Comparator.comparing(TideLevel::getTphLevel))
                            .orElse(null);

                    if (high == null || low == null) {
                        return null;
                    }

                    // 시각 포맷은 "HH:mm"
                    DateTimeFormatter tideTimeFmt = DateTimeFormatter.ofPattern("HH:mm");
                    TideSimpleDto highTideDto = new TideSimpleDto(
                            high.getTphLevel(),
                            high.getTphTime().format(tideTimeFmt)
                    );
                    TideSimpleDto lowTideDto = new TideSimpleDto(
                            low.getTphLevel(),
                            low.getTphTime().format(tideTimeFmt)
                    );

                    return new TideDayResDto(date, highTideDto, lowTideDto);
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        // (6) Wave 3일치
        List<Wave> waveForFp = (lzoneStr == null)
                ? Collections.emptyList()
                : waveMap.getOrDefault(lzoneStr, Collections.emptyList());

        // Wave DTO 리스트
        List<WaveResDto> waveResDtoList = waveForFp.stream()
                .map(wv -> WaveResDto.builder()
                        .wave_direction(convertWindDirection(wv.getWaveDirection()))
                        .wave_height(wv.getWaveHeight())
                        .wind_direction(convertWindDirection(wv.getWindDirection()))
                        .wind_speed(wv.getWindSpeed())
                        // 날짜/시간 포맷 (필요하다면)
//                            .dateTime(wv.getDateTime().format(dateTimeFormatter))
                        .build())
                .toList();
        return forecastOnePointResDto.builder()
                .point_id(pointId)
                .point_name(fp.getPointName())
                // 3일치 Weather
                .weather_forecast(forecastResDtoList)
                // 조위: 3일치 날짜별 High/Low
                .tide_info(tideDayResList)
                // 파고 리스트
                .wave_info(waveResDtoList)
                .build();
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