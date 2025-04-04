package com.mansun.features.board.repository;

import com.mansun.entity.board.Board;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {
//    Board에서 userId에 해당하는 모든 게시물을 가져온다 페이징 미적용

//  _ 사용은 https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html의 property Expression
    //userId와 boardId로 지워지지 않은 단일 게시글을 조회한다.
    Optional<Board> findBoardsByUser_UserIdAndBoardIdAndDeletedFalse(Long userId, Long boardId);
    //userId로 지워지지 않은 사용자의 작성 게시글을 조회한다.
    List<Board> findByUser_UserIdAndDeletedFalse(Long userId);

    //댓글과 대댓글을 가지고 있는 단건 게시물을 조회한다.
    @EntityGraph(attributePaths = {
            "comment",
            "comment.recomment"
    })
    Optional<Board> findWithCommentsAndRecommentsByBoardId(Long boardId);
}