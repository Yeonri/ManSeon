package com.mansun.be.domain.point.fishingpoint.repository;

import com.mansun.be.domain.point.entity.dataSet.SeaTemperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeaTemperatureRepository extends JpaRepository<SeaTemperature,Long> {
}
