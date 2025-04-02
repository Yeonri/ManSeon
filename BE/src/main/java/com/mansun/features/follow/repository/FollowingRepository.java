package com.mansun.features.follow.repository;

import com.mansun.entity.follow.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following,Long> {
    List<Following> findByUser_UserIdAndDeletedFalse (Long userId);
    int countAllByUser_UserIdAndDeletedFalse(Long userId);
}
