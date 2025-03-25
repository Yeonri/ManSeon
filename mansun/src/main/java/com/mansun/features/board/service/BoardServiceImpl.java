package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.board.Board;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.board.FindBoardResDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardrepository;

    //게시글을 작성하는 함수
    @Override
    public void createBoard(CustomUserDetails customUserDetails, CreateBoardReqDto boardParam) {
        Board board = new Board(customUserDetails, boardParam);
        Board saveBoard = boardrepository.save(board);//별도의 인증 과정은 필요 없다.
    }

    //userId를 이용해서 게시글을 찾는 함수
    @Override
    public List<FindMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails) {
        return boardrepository.findByUser_UserId(customUserDetails.getUserId())
                .stream()
                .map(board -> FindMyBoardListResDto
                        .builder()
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    //postId을 이용해서 게시글을 찾는 함수
    public FindBoardResDto findBoard(Long postId) {
        Board findboard = boardrepository.findById(postId).orElseThrow(
                ()-> new NoSuchElementException("게시글이 없습니다")
        );
        return FindBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    //사용자 정보와 boardId를 이용해서 게시글을 찾는 함수
    public FindBoardResDto findBoard(CustomUserDetails customUserDetails, Long boardId) {
        Board findboard = boardrepository.findById(boardId).orElseThrow();
        return FindBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    @Override
    public Board updateMyBoard(
            CustomUserDetails customUserDetails,
            UpdateMyBoardReqDto req) {
        Board findboard = boardrepository.findById(req.getPostId()).orElseThrow();
        BeanUtils.copyProperties(req,findboard,NullAwareBeanUtils.getNullPropertyNames(req));
        return findboard;
    }

    //내 게시물을 지운다
    @Override
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            DeleteMyBoardReqDto boardParam) {
        boardrepository.deleteById(boardParam.getBoardId());
    }
}
