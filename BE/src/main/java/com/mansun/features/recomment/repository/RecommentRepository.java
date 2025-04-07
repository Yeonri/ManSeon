package com.mansun.features.recomment.repository;

import com.mansun.entity.board.Recomment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RecommentRepository extends JpaRepository<Recomment,Long> {
    Optional<Recomment> findByRecommentIdAndDeletedFalse(Long recommentId);
}
