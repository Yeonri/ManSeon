package com.mansun.features.board.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.board.Board;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface BoardService {
    //내 게시판 글 작성
    public void createBoard(
            CustomUserDetails customUserDetails,
            CreateBoardReqDto boardParam);

    //내 게시판 글 열람
    public List<FindMyBoardListResDto> findMyBoardList(CustomUserDetails customUserDetails);
    
    //내 게시판 글 수정
    public Board updateMyBoard(
            CustomUserDetails customUserDetails,
            UpdateMyBoardReqDto boardParam);
    
    //내 게시판 글 삭제
    public void deleteMyBoard(
            CustomUserDetails customUserDetails,
            DeleteMyBoardReqDto boardParam);
}
