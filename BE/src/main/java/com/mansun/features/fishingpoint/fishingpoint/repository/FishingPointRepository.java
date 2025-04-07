package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.FishingPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishingPointRepository extends JpaRepository<FishingPoint,Long> {
    FishingPoint findFishingPointsByPointNameContaining(String pointName);
}