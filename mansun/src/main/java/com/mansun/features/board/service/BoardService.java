package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.board.createBoardReqDto;
import com.mansun.requestDto.board.deleteMyBoardReqDto;
import com.mansun.requestDto.board.updateMyBoardReqDto;
import com.mansun.responseDto.board.findMyBoardListResDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

public interface BoardService {
    //내 게시판 글 작성
    public void createBoard(
            CustomUserDetails customUserDetails,
            createBoardReqDto boardParam);

    //내 게시판 글 열람
    public List<findMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails);
    
    //내 게시판 글 수정
    public void updateMyBoard(
            CustomUserDetails customUserDetails,
            updateMyBoardReqDto boardParam);
    
    //내 게시판 글 삭제
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            deleteMyBoardReqDto boardParam);
}
