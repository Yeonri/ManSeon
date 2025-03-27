package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.FishingPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishingPointRepository extends JpaRepository<FishingPoint,Long> {
    public List<FishingPoint> findFishingPointsByPointNameContaining(String pointName);
}