package com.mansun.be.domain.board.repository;

import com.mansun.be.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByBoardIdAndDeletedFalse(Long boardId);

    List<Board> findAllByDeletedFalseOrderByCreatedAtDesc();

    List<Board> findAllByUser_UserIdAndDeletedFalseOrderByCreatedAtDesc(Long userId);

    List<Board> findTop10ByUser_UserIdInAndDeletedFalseOrderByCreatedAtDesc(List<Long> userIds);

    List<Board> findTop10ByDeletedFalseOrderByCreatedAtDesc();
}
