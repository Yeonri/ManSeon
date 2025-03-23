package com.mansun.features.board;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.board.service.BoardServiceImpl;
import com.mansun.requestDto.board.createBoardReqDto;
import com.mansun.requestDto.board.deleteMyBoardReqDto;
import com.mansun.requestDto.board.updateMyBoardReqDto;
import com.mansun.responseDto.board.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Tag(name = "BoardController",description = "게시판의 게시물의 CRUD를 담당하는 컨트롤러")
public class BoardController {
    private final BoardServiceImpl boardservice;

    //내 게시글 작성
    @ApiResponses(
            @ApiResponse(responseCode = "200")
    )
    @PostMapping
    public ResponseEntity<String> createBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody createBoardReqDto req) {
        boardservice.createBoard(customUserDetails,req);

        return ResponseEntity.ok("성공적으로 게시물이 생성되었습니다.");
    }
    //전체 게시글 리스트 아직 프론트가 무한 스크롤인지 페이징인지 얘기 안해줌 -> 페이징 필요함 차후에 구현
//    @GetMapping("/all/{page}")
//    public ResponseEntity<allBoardListResDto> findBoard(@RequestParam(value = "page") long page) {
//
//        return null;
//    }

    //전체 게시글 상세 열람 이 기능으로 내 게시물 상세 열람까지 구현
    @GetMapping("/detail")
    public ResponseEntity<findBoardResDto> findBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(value = "board_id",required = true) long boardId) {
        return ResponseEntity.ok(boardservice.findBoard(boardId));
    }

    //내 게시글 리스트 열람
    @GetMapping("/myList")
    public ResponseEntity<List<findMyBoardListResDto>> findMyBoardList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<findMyBoardListResDto> myBoardList =boardservice.findMyBoardList(customUserDetails);
        return ResponseEntity.ok(myBoardList);
    }

    //내 게시글 수정
    @PatchMapping
    public ResponseEntity<String> updateMyBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody updateMyBoardReqDto req) {
        boardservice.updateMyBoard(customUserDetails,req);
        return ResponseEntity.ok("성공적으로 게시글이 수정되었습니다");
    }

    //내 게시글 삭제
    @DeleteMapping
    public ResponseEntity<String> deleteMyBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody deleteMyBoardReqDto req){
        boardservice.deleteMyBoard(customUserDetails,req);
        return ResponseEntity.ok("성공적으로 게시글이 삭제되었습니다.");
    }

    //내 친구 게시글 리스트 열람
    @GetMapping
    public ResponseEntity<String> myFriendBoardList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ){
        return null;
    }
}
