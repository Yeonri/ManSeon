package com.mansun.features.follow.repository;

import com.mansun.entity.follow.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowingRepository extends JpaRepository<Following,Long> {
}
