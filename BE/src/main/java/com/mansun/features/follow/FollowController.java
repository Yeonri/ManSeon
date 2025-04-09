package com.mansun.features.follow;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.follow.service.FollowerServiceImpl;
import com.mansun.features.follow.service.FollowingServiceImpl;
import com.mansun.requestDto.follow.AddFollowReqDto;
import com.mansun.requestDto.follow.DeleteFollowReqDto;
import com.mansun.responseDto.MessageResDto;
import com.mansun.responseDto.follow.GetMyFollowerResDto;
import com.mansun.responseDto.follow.GetMyFollowingResDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "FollowController", description = "팔로워의 수와 연관 정보를 담당하는 컨트롤러")
public class FollowController {
    private final FollowerServiceImpl followerService;
    private final FollowingServiceImpl followingService;

    @PostMapping("/follow/my")
    public ResponseEntity<MessageResDto> addFollowing(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody AddFollowReqDto req
    ) {
        followingService.addFollow(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("팔로우했습니다"));
    }

    @GetMapping("/following/my")
    public ResponseEntity<List<GetMyFollowingResDto>> getMyFollowingList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(followingService.findMyFollwingList(customUserDetails));
    }

    @GetMapping("/follower/my")
    public ResponseEntity<List<GetMyFollowerResDto>> getMyFollowerList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(followerService.findMyFollowerList(customUserDetails));
    }

    @DeleteMapping("/follow/my")
    public ResponseEntity<MessageResDto> removeFollowing(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody DeleteFollowReqDto req
    ) {
        followingService.deleteFollow(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("팔로우를 취소했습니다."));
    }
}
