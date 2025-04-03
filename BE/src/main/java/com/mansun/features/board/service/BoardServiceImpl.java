package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.board.BoardListResDto;
import com.mansun.responseDto.board.FindBoardResDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import com.mansun.responseDto.board.FindOtherBoardListResDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    private final BoardRepository boardrepository;

    //게시글을 작성하는 함수
    @Override
    public void createBoard(CustomUserDetails customUserDetails, CreateBoardReqDto boardParam) {
        Board board = new Board(customUserDetails, boardParam);
        boardrepository.save(board);//별도의 인증 과정은 필요 없다.
    }

    @Override
    public Page<BoardListResDto> findAllBoardList(Pageable pageable) {
        return null;
    }

    //어차피 더미 데이터 만들어도 10만건 이하라 전체 조회한다.
//    @Override
//    public Page<BoardListResDto> findAllBoardList(Pageable pageable) {
//        QBoard board = QBoard.board;
//        QUsers user = QUsers.users;
//
//       List<BoardListResDto> content = queryFactory
//                .select(new BoardListResDto(
//                        board.boardId,
//                        board.title,
//                        user.nickname,
//                        board.createdAt
//                ))
//                .from(board)
//                .join(board.user, user)
//               .where(board.deleted.eq(false)) // 삭제되지 않은 게시글만
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .orderBy(board.createdAt.desc())
//                .fetch();
//
//        Long total = queryFactory
//                .select(board.count())
//                .from(board)
//                .where(board.deleted.eq(false))
//                .fetchOne();
//
//        return new PageImpl<>(content, pageable, total);
//    }

    public FindBoardResDto getBoardDetail(Long boardId) {
        Board board = boardrepository.findWithCommentsAndRecommentsByBoardId(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        // soft delete 처리: 삭제된 댓글/대댓글은 제외
        board.getComment().removeIf(Comment::isDeleted);
        for (Comment comment : board.getComment()) {
            comment.getRecomment().removeIf(Recomment::isDeleted);
        }
        return FindBoardResDto.builder()
                .boardId(board.getBoardId())
                .title(board.getTitle())
                .content(board.getContent())
                .commentList(board.getComment())
                .build();
    }

    //userId를 이용해서 게시글을 찾는 함수
    @Override
    public List<FindMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails) {
        System.out.println(customUserDetails.getUserId());
        return boardrepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId())
                .stream()
                .map(board -> FindMyBoardListResDto
                        .builder()
                        .postId(board.getBoardId())
                        .userId(board.getUser().getUserId())
                        .postImg(board.getPostImg())
                        .profileImg(board.getUser().getProfileImg())
                        .createdAt(board.getCreatedAt())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    public List<FindOtherBoardListResDto> findOtherBoardList(CustomUserDetails customUserDetails, Long userId) {
        return boardrepository.findByUser_UserIdAndDeletedFalse(userId)
                .stream()
                .map(board -> FindOtherBoardListResDto
                        .builder()
                        .postId(board.getBoardId())
                        .userId(board.getUser().getUserId())
                        .postImg(board.getPostImg())
                        .profileImg(board.getUser().getProfileImg())
                        .createdAt(board.getCreatedAt())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    //postId을 이용해서 게시글을 찾는 함수
    @Override
    public FindBoardResDto findBoard(Long boardId) {
        Board findboard = boardrepository.findById(boardId).orElseThrow(
                () -> new NoSuchElementException("게시글이 없습니다")
        );
        return FindBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    //사용자 정보와 boardId를 이용해서 단 건 게시글을 찾는 함수
    @Override
    public FindBoardResDto findBoard(CustomUserDetails customUserDetails, Long boardId) {
        Board findboard = boardrepository.findBoardsByUser_UserIdAndBoardId(customUserDetails.getUserId(), boardId);
        return FindBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    @Override
    public void updateMyBoard(
            CustomUserDetails customUserDetails,
            UpdateMyBoardReqDto req) {
        Board findboard = boardrepository.findById(req.getPostId()).orElseThrow();
        BeanUtils.copyProperties(req, findboard, NullAwareBeanUtils.getNullPropertyNames(req));
    }

    //내 게시물을 지운다
    @Override
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            DeleteMyBoardReqDto boardParam) {
        boardrepository.findById(boardParam.getBoardId())
                .orElseThrow()
                .setDeleted(true);
    }
}