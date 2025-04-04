package com.mansun.features.user.repository;

import com.mansun.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByPhoneNum(String phoneNum);

    Optional<Users> findByEmailAndDeletedFalse(String email);

    Optional<Users> findByUserIdAndEmailAndDeletedFalse(Long userId, String email);

    boolean existsByEmailAndDeletedFalse(String email);

    boolean existsByNicknameAndDeletedFalse(String nickname);

    boolean existsByUserIdAndEmailAndDeletedFalse(Long userId, String email);

    Optional<Users> findByNicknameAndDeletedFalse(String nickname);
}