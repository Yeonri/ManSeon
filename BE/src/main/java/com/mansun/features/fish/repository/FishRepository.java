package com.mansun.features.fish.repository;

import com.mansun.entity.fish.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishRepository extends JpaRepository<Fish,Long> {
    Fish findByUser_UserIdAndFishIdAndDeletedFalse(Long userId, Long fishId);
    List<Fish> findByUser_UserIdAndDeletedFalse(Long userId);
    int countAllByUser_UserId(Long userId);

    List<Fish> findByUser_UserIdAndFishType_FishType(Long userId, Long fishType);
}
