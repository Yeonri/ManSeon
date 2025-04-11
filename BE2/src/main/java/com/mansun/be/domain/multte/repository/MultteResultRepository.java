package com.mansun.be.domain.multte.repository;

import com.mansun.be.domain.multte.entity.MultteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MultteResultRepository extends JpaRepository<MultteResult, Long> {

    // 특정 시간의 상위 5개
    List<MultteResult> findTop5ByDatetimeOrderByElboScoreDesc(LocalDateTime datetime);

    // 같은 연-월-일-시 기준 상위 5개 조회 (elbo_score 내림차순)
    @Query(value = """
        SELECT * FROM multte_result 
        WHERE DATE_FORMAT(datetime, '%Y-%m-%d %H') = DATE_FORMAT(:datetime, '%Y-%m-%d %H') 
        ORDER BY elbo_score DESC 
        LIMIT 5
        """, nativeQuery = true)
    List<MultteResult> findTop5ByHour(@Param("datetime") LocalDateTime datetime);

}

