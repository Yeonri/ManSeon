package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface SunMoonTimesRepository extends JpaRepository<SunMoonTimes,Long> {
    SunMoonTimes findSunMoonTimesByLocDateAndFishingPoint_PointId(LocalDate locDate,Long pointId);
}
