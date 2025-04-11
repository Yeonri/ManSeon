package com.mansun.be.domain.point.fishingpoint.repository;


import com.mansun.be.domain.point.entity.dataSet.TideLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface TideLevelRepository extends JpaRepository<TideLevel,Long> {
    List<TideLevel> findByObsCode_ObsCodeInAndTphTimeBetween(
            List<String> obsCodes,
            LocalDateTime startTime,
            LocalDateTime endTime
    );
    List<TideLevel> findByObsCode_ObsCodeIn(Collection<String> obsCode_obsCode);
    List<TideLevel> findByObsCode_ObsCode(String obsCode);
}
