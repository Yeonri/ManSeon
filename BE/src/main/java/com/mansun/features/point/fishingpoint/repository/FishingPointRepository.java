package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.FishingPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishingPointRepository extends JpaRepository<FishingPoint,Long> {
    public List<FishingPoint> findFishingPointsByPointNameContaining(String pointName);
}