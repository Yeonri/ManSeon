package com.mansun.be.domain.follow.repository;

import com.mansun.be.domain.follow.entity.Following;
import com.mansun.be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following, Long> {

    boolean existsByUserAndFollowingUser(User user, User followingUser);

    void deleteByUserAndFollowingUser(User user, User followingUser);

    List<Following> findAllByUser_UserId(Long userId);
}