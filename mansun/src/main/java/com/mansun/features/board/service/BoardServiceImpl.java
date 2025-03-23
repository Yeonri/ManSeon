package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.board.Board;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.requestDto.board.createBoardReqDto;
import com.mansun.requestDto.board.deleteMyBoardReqDto;
import com.mansun.requestDto.board.updateMyBoardReqDto;
import com.mansun.responseDto.board.findBoardResDto;
import com.mansun.responseDto.board.findMyBoardListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardrepository;

    //게시글을 작성하는 함수
    @Override
    public void createBoard(CustomUserDetails customUserDetails, createBoardReqDto boardParam) {
        Board board = new Board(customUserDetails, boardParam);
        Board saveBoard = boardrepository.save(board);//별도의 인증 과정은 필요 없다.
    }

    //userId를 이용해서 게시글을 찾는 함수
    @Override
    public List<findMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails) {
        return boardrepository.findBoardsByUser_UserId(customUserDetails.getUserId())
                .stream()
                .map(board -> findMyBoardListResDto
                        .builder()
                        .title(board.getTitle())
                        .content(board.getContent())
                        .build())
                .toList();
    }

    //boardId을 이용해서 게시글을 찾는 함수
    public findBoardResDto findBoard(Long boardId) {
        Board findboard = boardrepository.findById(boardId).orElseThrow();
        return findBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    //사용자 정보와 boardId를 이용해서 게시글을 찾는 함수
    public findBoardResDto findBoard(CustomUserDetails customUserDetails,Long boardId) {
        Board findboard = boardrepository.findById(boardId).orElseThrow();
        return findBoardResDto
                .builder()
                .title(findboard.getTitle())
                .content(findboard.getContent())
                .build();
    }

    @Override
    public void updateMyBoard(CustomUserDetails customUserDetails,updateMyBoardReqDto boardParam) {
        Board board = boardrepository.findById(boardParam.getPostId()).orElseThrow();
    }

    //내 게시물을 지운다
    @Override
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            deleteMyBoardReqDto boardParam) {
        boardrepository.deleteById(boardParam.getBoardId());
    }
}
