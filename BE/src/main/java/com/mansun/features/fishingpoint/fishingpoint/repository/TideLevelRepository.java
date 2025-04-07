package com.mansun.features.fishingpoint.fishingpoint.repository;

import com.mansun.entity.fishingPoint.dataSet.Observatory;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TideLevelRepository extends JpaRepository<TideLevel,Long> {
    List<TideLevel> findByObsCode_ObsCodeIn(Collection<String> obsCode_obsCode);
    List<TideLevel> findByObsCode_ObsCode(String obsCode);
}
