package com.mansun.features.follow;

import com.mansun.features.follow.service.FollowerServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/follow")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "FollowController",description = "팔로워의 수와 연관 정보를 담당하는 컨트롤러")
public class FollowController {
    private final FollowerServiceImpl followService;


}
