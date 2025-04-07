package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Wave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WaveHeightRepository extends JpaRepository<Wave,Long> {
    List<Wave> findByMarineZone_Lzone(Integer marineZone_lzone);
}
