package com.mansun.be.domain.fish.repository;

import com.mansun.be.domain.fish.entity.Fish;
import com.mansun.be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishRepository extends JpaRepository<Fish, Long> {

    List<Fish> findAllByUserAndDeletedFalseOrderByCreatedAtDesc(User user);
}
