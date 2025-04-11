package com.mansun.be.domain.point.fishingpoint.repository;

import com.mansun.be.domain.point.entity.dataSet.MarineZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarineZoneRepository extends JpaRepository<MarineZone,Long> {
}
