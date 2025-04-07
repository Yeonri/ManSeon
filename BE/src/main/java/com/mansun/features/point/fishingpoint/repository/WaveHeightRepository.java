package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Wave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WaveHeightRepository extends JpaRepository<Wave,Long> {
    List<Wave> findByMarineZone_Lzone(Integer marineZone_lzone);
}
