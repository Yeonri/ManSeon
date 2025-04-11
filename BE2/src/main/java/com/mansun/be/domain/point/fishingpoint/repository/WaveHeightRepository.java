package com.mansun.be.domain.point.fishingpoint.repository;



import com.mansun.be.domain.point.entity.dataSet.Wave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface WaveHeightRepository extends JpaRepository<Wave,Long> {
    List<Wave> findByMarineZone_LzoneInAndDateTimeBetween(
            Collection<Integer> marineZone_lzone, LocalDateTime dateTime, LocalDateTime dateTime2
    );
    List<Wave> findByMarineZone_LzoneIn(Collection<Integer> marineZone_lzone);
}
