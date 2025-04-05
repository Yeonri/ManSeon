package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<Weather,Long> {
    public List<Weather> findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate startDate, LocalDate endDate, Long pointId);
}
