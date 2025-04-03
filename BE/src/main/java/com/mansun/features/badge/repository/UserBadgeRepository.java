package com.mansun.features.badge.repository;

import com.mansun.entity.badge.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    //UserId와 지워졌는지 여부 확인해서 User의 USerBadge를 모두 가져온다.
    List<UserBadge> findByUser_UserIdAndDeletedFalse(Long userId);

    // User가 획득한 배지 중 지워지지 않은 전체 갯수
    int countAllByUser_UserIdAndDeletedFalse(Long userId);
}
