package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TideLevelRepository extends JpaRepository<TideLevel,Long> {
    public List<TideLevel> findByObsCode_ObsCode(String obsCode);
}
