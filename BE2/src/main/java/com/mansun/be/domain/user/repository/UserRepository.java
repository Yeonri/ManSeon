package com.mansun.be.domain.user.repository;

import com.mansun.be.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNum(String phoneNum);

    Optional<User> findByEmailAndDeletedFalse(String email);

    Optional<User> findByUserIdAndDeletedFalse(Long userId);

    boolean existsByEmailAndDeletedFalse(String email);

    boolean existsByNicknameAndDeletedFalse(String nickname);

    boolean existsByPhoneNumAndDeletedFalse(String phoneNum);

    boolean existsByUserIdAndEmailAndDeletedFalse(Long userId, String email);

    Optional<User> findByNicknameAndDeletedFalse(String nickname);
}

