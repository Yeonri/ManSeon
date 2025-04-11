package com.mansun.be.domain.point.userpoint.repository;

import com.mansun.be.domain.point.entity.UserPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPointRepository extends JpaRepository<UserPoint,Long> {
    public List<UserPoint> findByUser_UserIdAndDeletedFalse(Long userId);
}
