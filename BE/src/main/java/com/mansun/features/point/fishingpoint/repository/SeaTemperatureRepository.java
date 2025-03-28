package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.SeaTemperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeaTemperatureRepository extends JpaRepository<SeaTemperature,Long> {
}
