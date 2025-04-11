package com.mansun.be.domain.fish.repository;

import com.mansun.be.domain.fish.entity.Fish;
import com.mansun.be.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FishRepository extends JpaRepository<Fish, Long> {

    List<Fish> findAllByUserAndDeletedFalseOrderByCreatedAtDesc(User user);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.fishes WHERE u.userId = :userId")
    Optional<User> findByIdWithFishes(@Param("userId") Long userId);

    // 2. 특정 날짜 이후 등록된 물고기 (예: 최근 일주일)
    List<Fish> findAllByUserAndCreatedAtAfterAndDeletedFalseOrderByCreatedAtDesc(User user, LocalDateTime after);

    // 3. 특정 물고기 타입별 조회 (예: 광어만 보기)
    List<Fish> findAllByUserAndFishType_FishTypeAndDeletedFalseOrderByCreatedAtDesc(User user, Integer fishTypeId);

    // 4. 위경도 기준 근처 데이터 조회 (예: 지도 기반)
    List<Fish> findAllByLatBetweenAndLngBetweenAndDeletedFalse(double latMin, double latMax, double lngMin, double lngMax);

    List<Fish> findByUser_UserIdAndDeletedFalse(Long userId);
}

