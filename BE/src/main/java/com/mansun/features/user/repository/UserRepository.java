package com.mansun.features.user.repository;

import com.mansun.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
    public Optional<Users> findByEmailAndDeletedFalse(String email);

    public Optional<Users> findByUserIdAndEmailAndDeletedFalse(Long userId, String email);
    public boolean existsByEmailAndDeletedFalse(String email);

    public boolean existsByNicknameAndDeletedFalse(String nickname);

    public boolean existsByUserIdAndEmailAndDeletedFalse(Long userId, String email);

    public Optional<Users> findByNicknameAndDeletedFalse(String nickname);
}