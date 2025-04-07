package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.Users;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import com.mansun.responseDto.board.FindOtherBoardListResDto;
import com.mansun.responseDto.board.allBoardListResDto;
import com.mansun.responseDto.board.findboard.FindBoardCommentRecommentResDto;
import com.mansun.responseDto.board.findboard.FindBoardCommentResDto;
import com.mansun.responseDto.board.findboard.FindBoardResDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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
        boardrepository.save(Board.builder()
                .title(boardParam.getTitle())
                .content(boardParam.getContent())
                .user(new Users(customUserDetails))
                .createdAt(LocalDateTime.now())
                .postImg(boardParam.getPostImg())
                .likeNum(0)
                .deleted(false)
                .build());//별도의 인증 과정은 필요 없다.
    }

    @Override
    public List<allBoardListResDto> findAllBoardList() {
        List<Board> boardList = boardrepository.findAllByDeletedFalseOrderByCreatedAtDesc();
        return boardList.stream().map(
                b -> allBoardListResDto.builder()
                        .postId(b.getBoardId())
                        .userId(b.getUser().getUserId())
                        .nickname(b.getUser().getUsername())
                        .title(b.getTitle())
                        .content(b.getContent())
                        .profileImg(b.getUser().getProfileImg())
                        .createdAt(b.getCreatedAt().atOffset(ZoneOffset.UTC))
                        .commentNum(b.getCommentNum())
                        .like(b.getLikeNum())
                        .postImg(b.getPostImg())
                        .build()
        ).collect(Collectors.toList());
    }

    //어차피 더미 데이터 만들어도 10만건 이하라 전체 조회한다.
//    @Override
//    public Page<BoardListResDto> findAllBoardList(Pageable pageable) {
//        QBoard board = QBoard.board;
//        QUsers user = QUsers.users;
//
//       List<BoardListResDto> content = queryFactory
//                .select(new BoardListResDto(
//                        board.boardId.longValue(),
//                        board.title.stringValue(),
//                        user.nickname.stringValue(),
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
//       boardId를 이용해 댓글과 대댓글을 동시에 가져오는 로직을 짠다.
    @Override
    public FindBoardResDto getBoardDetail(Long boardId) {

        Board board = boardrepository.findWithCommentsAndRecommentsByBoardId(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        // soft delete 처리: 삭제된 댓글/대댓글은 제외
        board.getComment().removeIf(Comment::isDeleted);
        //board의 댓글 리스트를 돌면서 지워진 대댓글은 지운다.
        for (Comment comment : board.getComment()) {
            comment.getRecomment().removeIf(Recomment::isDeleted);
        }
//        FindBoardResDto에 맞춰 Builder로 한번에 객체를 생성해 반환
        return FindBoardResDto
                .builder()
                .postId(board.getBoardId())
                .userId(board.getUser().getUserId())
                .nickname(board.getUser().getUsername())
                .postImg(board.getPostImg())
                .profileImg(board.getUser().getProfileImg())
                .createdAt(board.getCreatedAt().atOffset(ZoneOffset.UTC))
                .title(board.getTitle())
                .content(board.getContent())
                .commentList(board.getComment().stream().map(
                        b -> FindBoardCommentResDto.builder()
                                .commentId(b.getCommentId())
                                .boardId(b.getBoard().getBoardId())
                                .userId(b.getUser().getUserId())
                                .username(b.getUser().getUsername())
                                .nickname(b.getUser().getNickname())
                                .createdAt(b.getCreatedAt().atOffset(ZoneOffset.UTC))
                                .commentContent(b.getCommentContent())
                                .recommentNum(b.getRecommentNum())
                                .recomment(b.getRecomment().stream().map(
                                        r -> FindBoardCommentRecommentResDto.builder()
                                                .recommentId(r.getRecommentId())
                                                .recommentContent(r.getRecommentContent())
                                                .userId(r.getUser().getUserId())
                                                .boardId(r.getBoard().getBoardId())
                                                .commentId(r.getComment().getCommentId())
                                                .createdAt(r.getCreatedAt().atOffset(ZoneOffset.UTC))
                                                .build()
                                ).collect(Collectors.toList()))
                                .build()).collect(Collectors.toList()))
                .build();
    }

    //userId를 이용해서 게시글을 찾는 함수
    @Override
    public List<FindMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails) {
//        내 게시글 리스트를 JWT token을 통한 user Id추출로
//        나의 지워지지 않은 게시글 리스트를 얻은 후
//        FindMyBoardListResDto로 한번에 객체를 만들어 반환
        return boardrepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId())
                .stream()
                .map(board -> FindMyBoardListResDto
                        .builder()
                        .postId(board.getBoardId())
                        .userId(board.getUser().getUserId())
                        .postImg(board.getPostImg())
                        .profileImg(board.getUser().getProfileImg())
                        .createdAt(board.getCreatedAt().atOffset(ZoneOffset.UTC))
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    public List<FindOtherBoardListResDto> findOtherBoardList(CustomUserDetails customUserDetails, Long userId) {
//        위 로직과 동일하나 찾는 것이 타인의 userId로 바뀌었다.
        return boardrepository.findByUser_UserIdAndDeletedFalse(userId)
                .stream()
                .map(board -> FindOtherBoardListResDto
                        .builder()
                        .postId(board.getBoardId())
                        .userId(board.getUser().getUserId())
                        .postImg(board.getPostImg())
                        .profileImg(board.getUser().getProfileImg())
                        .createdAt(board.getCreatedAt().atOffset(ZoneOffset.UTC))
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    //boardId을 이용해서 게시글을 찾는 함수
    @Override
    public FindBoardResDto findBoard(Long boardId) {
//        boardId를 이용해 단건 게시글을 찾은 후 만약 null이라면 예외 처리한다.
        Board board = boardrepository.findById(boardId).orElseThrow(
                () -> new NoSuchElementException("게시글이 없습니다")
        );
        // soft delete 처리: 삭제된 댓글/대댓글은 제외
        board.getComment().removeIf(Comment::isDeleted);
        //board의 댓글 리스트를 돌면서 지워진 대댓글은 지운다.
        for (Comment comment : board.getComment()) {
            comment.getRecomment().removeIf(Recomment::isDeleted);
        }
//        FindBoardResDto를 객체로 한번에 만들어 반환
        return FindBoardResDto
                .builder()
                .postId(board.getBoardId())
                .userId(board.getUser().getUserId())
                .nickname(board.getUser().getUsername())
                .postImg(board.getPostImg())
                .profileImg(board.getUser().getProfileImg())
                .createdAt(board.getCreatedAt().atOffset(ZoneOffset.UTC))
                .title(board.getTitle())
                .content(board.getContent())
                .commentList(board.getComment().stream().map(
                        b -> FindBoardCommentResDto.builder()
                                .commentId(b.getCommentId())
                                .boardId(b.getBoard().getBoardId())
                                .userId(b.getUser().getUserId())
                                .username(b.getUser().getUsername())
                                .nickname(b.getUser().getNickname())
                                .createdAt(b.getCreatedAt().atOffset(ZoneOffset.UTC))
                                .commentContent(b.getCommentContent())
                                .recommentNum(b.getRecommentNum())
                                .recomment(b.getRecomment().stream().map(
                                        r -> FindBoardCommentRecommentResDto.builder()
                                                .recommentId(r.getRecommentId())
                                                .recommentContent(r.getRecommentContent())
                                                .userId(r.getUser().getUserId())
                                                .boardId(r.getBoard().getBoardId())
                                                .commentId(r.getComment().getCommentId())
                                                .createdAt(r.getCreatedAt().atOffset(ZoneOffset.UTC))
                                                .build()
                                ).collect(Collectors.toList()))
                                .build()).collect(Collectors.toList()))
                .build();
    }

    //사용자 정보와 boardId를 이용해서 단 건 게시글을 찾는 함수
    @Override
    public FindBoardResDto findBoard(CustomUserDetails customUserDetails, Long boardId) {
//        UserId와 BoardId를 이용해서 지워지지 않은 단건 게시글을 조회한다.
        Board findboard = boardrepository
                .findBoardsByUser_UserIdAndBoardIdAndDeletedFalse(customUserDetails.getUserId(), boardId)
                .orElseThrow();
//        해당 단건 게시글을 Builder 객체로 반환
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
//        boardId로 단건 조회한다.
        Board findboard = boardrepository.findById(req.getPostId()).orElseThrow();
//        단건 조회한 해당 게시글을 BeanUtils를 이용해 null값이 아닌 부분만 바꾼다
//        이때 JPA Context가 작동
        BeanUtils.copyProperties(req, findboard, NullAwareBeanUtils.getNullPropertyNames(req));
    }

    //내 게시물을 지운다
    @Override
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            DeleteMyBoardReqDto boardParam) {
//        soft Delete
        boardrepository.findById(boardParam.getBoardId())
                .orElseThrow()
                .setDeleted(true);
    }
}