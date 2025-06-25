package com.mansun.be.domain.point.fishingpoint.repository;


import com.mansun.be.domain.point.entity.dataSet.SunMoonTimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SunMoonTimesRepository extends JpaRepository<SunMoonTimes,Long> {
    Optional<List<SunMoonTimes>>findByLocDateOrderByFishingPointAsc(LocalDate localDate);
    List<SunMoonTimes> findByLocDateAndFishingPoint_PointIdIn(LocalDate date, List<Long> pointIds);

    SunMoonTimes findByLocDateAndFishingPoint_PointId(LocalDate locDate, Long pointId);
}
