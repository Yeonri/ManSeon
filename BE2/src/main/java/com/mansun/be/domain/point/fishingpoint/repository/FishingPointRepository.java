package com.mansun.be.domain.point.fishingpoint.repository;


import com.mansun.be.domain.point.entity.FishingPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FishingPointRepository extends JpaRepository<FishingPoint,Long> {
    Optional<List<FishingPoint>> findFishingPointsByPointNameContainingOrderByPointName(String pointName);
}