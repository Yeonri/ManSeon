package com.mansun.features.comment.repository;

import com.mansun.entity.board.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    Optional<List<Comment>> findByBoard_BoardId(Long boardId);
}
