package com.mansun.features.point.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Observatory;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TideLevelRepository extends JpaRepository<TideLevel,Long> {
    public List<TideLevel> findByObs_ObsId(Long obsId);
}
