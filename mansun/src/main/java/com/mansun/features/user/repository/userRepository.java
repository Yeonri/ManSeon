package com.mansun.features.user.repository;

import com.mansun.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<Users,Long> {
    public Optional<Users> findByEmail(String email);
    public Optional<Users> findByUserIdAndEmail(Long userId,String email);
    public boolean existsByUserIdAndEmail(Long userId,String email);
}
