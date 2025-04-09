package com.mansun.be.domain.comment.repository;

import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByBoardAndParentIsNullAndDeletedFalseOrderByCreatedAtDesc(Board board);

    List<Comment> findAllByBoardAndParentIsNullAndDeletedFalseOrderByCreatedAtAsc(Board board);


}

