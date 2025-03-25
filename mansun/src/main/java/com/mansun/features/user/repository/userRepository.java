package com.mansun.features.user.repository;

import com.mansun.entity.Users;
import com.mansun.entity.follow.Follower;
import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<Users,Long> {
    public Optional<Users> findByEmail(String email);
    public Optional<Users> findByUserIdAndEmail(Long userId,String email);
    public boolean existsByUserIdAndEmail(Long userId,String email);

    public Optional<Users> findByNickname(String nickname);
}
