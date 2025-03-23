package com.mansun.features.board.repository;

import com.mansun.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {
//    Board에서 userId에 해당하는 모든 게시물을 가져온다 페이징 미적용
    public List<Board> findBoardsByUser_UserId(Long userId);

//  _ 사용은 https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html의 property Expression 참고
    public List<Board> findBoardsByUser_UserIdAndPostId(Long userId, Long postId);

}
