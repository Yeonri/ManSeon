package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.board.BoardListResDto;
import com.mansun.responseDto.board.FindBoardResDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import com.mansun.responseDto.board.allBoardListResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface BoardService {
    //내 게시판 글 작성
    void createBoard(
            CustomUserDetails customUserDetails,
            CreateBoardReqDto boardParam);

    //전체 게시글 조회
    List<allBoardListResDto> findAllBoardList();
//    Page<BoardListResDto> findAllBoardList(Pageable pageable);

    //내 게시글 리스트 열람
    List<FindMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails);

    //UserId와 BoardId로 단일 게시글 조회
    FindBoardResDto findBoard(CustomUserDetails customUserDetails, Long boardId);

    FindBoardResDto getBoardDetail(Long boardId);

    //boardId로 단일 게시글 조회
    FindBoardResDto findBoard(Long postId);

    //내 게시글 수정
    void updateMyBoard(
            CustomUserDetails customUserDetails,
            UpdateMyBoardReqDto boardParam);
    //내 게시글 삭제
    void deleteMyBoard(
            CustomUserDetails customUserDetails,
            DeleteMyBoardReqDto boardParam);
}
