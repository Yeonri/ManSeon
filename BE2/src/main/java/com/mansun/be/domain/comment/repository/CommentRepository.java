package com.mansun.be.domain.comment.repository;

import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByBoard_BoardIdAndDeletedFalseOrderByCreatedAtAsc(Long boardId);
    List<Comment> findAllByParent_CommentIdAndDeletedFalseOrderByCreatedAtAsc(Long parentId);
    List<Comment> findAllByBoardAndParentIsNullAndDeletedFalseOrderByCreatedAtAsc(Board board);
}
