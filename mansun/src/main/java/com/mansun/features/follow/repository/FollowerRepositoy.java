package com.mansun.features.follow.repository;

import com.mansun.entity.follow.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowerRepositoy extends JpaRepository<Follower,Long> {
}
