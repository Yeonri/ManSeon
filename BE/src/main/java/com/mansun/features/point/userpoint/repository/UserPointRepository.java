package com.mansun.features.point.userpoint.repository;

import com.mansun.entity.fishingPoint.UserPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPointRepository extends JpaRepository<UserPoint,Long> {
    public List<UserPoint> findByUser_UserIdAndDeletedFalse(Long userId);
}
