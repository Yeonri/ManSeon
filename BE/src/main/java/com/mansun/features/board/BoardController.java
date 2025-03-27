package com.mansun.features.board;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.board.service.BoardServiceImpl;
import com.mansun.requestDto.board.CreateBoardReqDto;
import com.mansun.requestDto.board.DeleteMyBoardReqDto;
import com.mansun.requestDto.board.UpdateMyBoardReqDto;
import com.mansun.responseDto.OnlyMessageResDto;
import com.mansun.responseDto.board.FindBoardResDto;
import com.mansun.responseDto.board.FindMyBoardListResDto;
import com.mansun.responseDto.board.allBoardListResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "BoardController", description = "게시판의 게시물의 CRUD를 담당하는 컨트롤러")
public class BoardController {
    private final BoardServiceImpl boardservice;

    // 내 게시글 작성
    @Operation(summary = "게시글 추가")
    @PostMapping
    public ResponseEntity<OnlyMessageResDto> createBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody CreateBoardReqDto req) {
        boardservice.createBoard(customUserDetails, req);
        return ResponseEntity.ok(new OnlyMessageResDto("성공적으로 게시물이 생성되었습니다."));
    }

    @Operation(summary = "전체 게시글 리스트")
    @GetMapping("/all")
    public ResponseEntity<List<allBoardListResDto>> allBoardList(
    ) {
        return ResponseEntity.ok(boardservice.findAllBoardList());
    }
    // 전체 게시글 상세 열람 (내 게시물 상세 열람 포함)
    @Operation(summary = "전체 게시글 상세 열람", parameters = {
            @Parameter(name = "id", description = "게시판 아이디", required = true)
    })
    @GetMapping("/all/detail")
    public ResponseEntity<FindBoardResDto> findBoard(
            @RequestParam(value = "board_id") long boardId) {
        return ResponseEntity.ok(boardservice.findBoard(boardId));
    }
    // 내 게시글 리스트 열람
    @Operation(summary = "내 게시글 리스트 열람")
    @GetMapping("/myList")
    public ResponseEntity<List<FindMyBoardListResDto>> findMyBoardList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<FindMyBoardListResDto> myBoardList = boardservice.findMyBoardList(customUserDetails);
        return ResponseEntity.ok(myBoardList);
    }

    // 내 게시글 수정
    @Operation(summary = "내 게시글 수정")
    @PatchMapping
    public ResponseEntity<OnlyMessageResDto> updateMyBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody UpdateMyBoardReqDto req) {
        boardservice.updateMyBoard(customUserDetails, req);
        return ResponseEntity.ok(new OnlyMessageResDto("성공적으로 게시글이 수정되었습니다"));
    }

    // 내 게시글 삭제
    @Operation(summary = "내 게시글 삭제")
    @DeleteMapping
    public ResponseEntity<OnlyMessageResDto> deleteMyBoard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody DeleteMyBoardReqDto req) {
        boardservice.deleteMyBoard(customUserDetails, req);
        return ResponseEntity.ok(new OnlyMessageResDto("성공적으로 게시글이 삭제되었습니다."));
    }

    // 내 친구 게시글 리스트 열람
    @Operation(summary = "내 친구의 게시글 리스트 열람")
    @GetMapping
    public ResponseEntity<OnlyMessageResDto> myFriendBoardList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return null;
    }
}
