package com.mansun.be.domain.follow.repository;

import com.mansun.be.domain.follow.entity.Follower;
import com.mansun.be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, Long> {

    boolean existsByUserAndFollower(User user, User follower);

    void deleteByUserAndFollower(User user, User follower);

    List<Follower> findAllByUser_UserId(Long userId);
}