package com.mansun.features.follow.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.follow.Follower;
import com.mansun.entity.follow.Following;
import com.mansun.features.follow.repository.FollowingRepository;
import com.mansun.features.user.repository.UserRepository;
import com.mansun.responseDto.follow.GetMyFollowerResDto;
import com.mansun.responseDto.follow.GetMyFollowingResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowingServiceImpl implements FollowingService{
    private final UserRepository userRepository;
    private final FollowingRepository followingRepository;

    public List<GetMyFollowingResDto> findMyFollwingList(
            CustomUserDetails customUserDetails
    ){
        List<Following> followingList =
                followingRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        List<Users> userList = new ArrayList<>();
        for (Following f : followingList) {
            userList.add(userRepository.findById(f.getFollowingUserId()).orElseThrow());
        }
        return userList
                .stream()
                .map(
                        u -> GetMyFollowingResDto.builder()
                                .userId(customUserDetails.getUserId())
                                .followerId(u.getUserId())
                                .name(u.getUsername())
                                .build()
                )
                .collect(Collectors.toList());
    }
}
