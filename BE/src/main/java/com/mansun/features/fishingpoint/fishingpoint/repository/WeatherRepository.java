package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Wave;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeatherRepository extends JpaRepository<Weather,Long> {

    Optional<List<Weather>> findWeatherByWeatherDateAndFishingPoint_PointId(LocalDate weatherDate, Long pointId);
    List<Weather> findFirstByWeatherDateAndFishingPoint_PointIdInOrderByTmxDesc(LocalDate date, List<Long> pointIds);
     List<Weather>findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate weatherDate, LocalDate weatherDate2, Long fishingPoint_pointId);
}
