package com.mansun.be.domain.like.repository;

import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.like.entity.Like;
import com.mansun.be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndBoard(User user, Board board);

    int countByBoardAndDeletedFalse(Board board);

}
