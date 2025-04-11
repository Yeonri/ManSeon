package com.mansun.be.domain.point.fishingpoint.repository;

import com.mansun.be.domain.point.entity.dataSet.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Optional<List<Weather>> findByWeatherDateOrderByFishingPoint(
            LocalDate weatherDate);
    List<Weather> findByWeatherDateBetweenAndFishingPoint_PointId(LocalDate weatherDate, LocalDate weatherDate2, Long fishingPoint_pointId);
}
