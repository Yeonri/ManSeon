package com.mansun.features.follow.repository;

import com.mansun.entity.follow.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following,Long> {
    public List<Following> findByUser_UserId(Long userId);
    public int countAllByUser_UserId(Long userId);
}
