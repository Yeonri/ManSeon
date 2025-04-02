package com.mansun.features.badge.repository;

import com.mansun.entity.badge.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser_UserIdAndDeletedFalse(Long userId);
}
