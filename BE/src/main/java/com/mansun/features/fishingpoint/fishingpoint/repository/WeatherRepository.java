package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Wave;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<Weather,Long> {
    List<Weather> findFirstByWeatherDateAndFishingPoint_PointIdInOrderByTmxDesc(LocalDate date, List<Long> pointIds);

    Weather findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmnAsc(LocalDate weatherDate, Long fishingPoint_pointId);
    Weather findFirstByWeatherDateAndFishingPoint_PointIdOrderByTmxDesc(LocalDate weatherDate, Long fishingPoint_pointId);
    List<Weather>findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate weatherDate, LocalDate weatherDate2, Long fishingPoint_pointId);
    public List<Weather> findAllByWeatherDateBetweenAndFishingPoint_PointId(LocalDate weatherDate, LocalDate weatherDate2, Long pointId);
}
