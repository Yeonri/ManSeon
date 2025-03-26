package com.mansun.features.fish.repository;

import com.mansun.entity.fish.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishRepository extends JpaRepository<Fish,Long> {
    public Fish findByUser_UserIdAndFishId(Long userId,Long fishId);
    public List<Fish> findByUser_UserId(Long userId);
}
