package com.mansun.features.follow.repository;

import com.mansun.entity.follow.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowerRepositoy extends JpaRepository<Follower, Long> {

    List<Follower> findByUser_UserIdAndDeletedFalse(Long userId);

    int countAllByUser_UserIdAndDeletedFalse(Long userId);
}
