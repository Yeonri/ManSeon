package com.mansun.features.user.repository;

import com.mansun.entity.QUsers;
import com.mansun.entity.Users;
import com.mansun.entity.follow.QFollower;
import com.mansun.entity.follow.QFollowing;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class customRepositoryImpl implements customRepository {
    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Users> findMyFollowingList(Long userId) {
        JPAQueryFactory queryFactory=new JPAQueryFactory(em);

        QFollowing following = QFollowing.following;
        QUsers user = QUsers.users;

        return queryFactory
                .select(user)
                .from(following)
                // following.followingUserId와 Users.userId를 조인하여 팔로잉 대상 유저 정보를 가져옴
                .join(user).on(user.userId.eq(following.user.userId))
                // 현재 로그인한 사용자가 팔로잉한 기록만 필터링
                .where(following.user.userId.eq(userId))
                .fetch();
    }

    @Override
    public List<Users> findMyFollowerList(Long userId) {
        JPAQueryFactory queryFactory=new JPAQueryFactory(em);

        QFollower follower = QFollower.follower;
        QUsers user = QUsers.users;

        return queryFactory
                .select(user)
                .from(follower)
                // follower.follower의 user의 연관관계와 Users.userId를 조인하여 팔로잉 대상 유저 정보를 가져옴
                .join(user).on(user.userId.eq(follower.user.userId))
                // 현재 로그인한 사용자가 팔로잉한 기록만 필터링
                .where(follower.user.userId.eq(userId))
                .fetch();
    }
}
