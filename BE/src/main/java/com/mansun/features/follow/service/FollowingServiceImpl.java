package com.mansun.features.follow.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.follow.Follower;
import com.mansun.entity.follow.Following;
import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.follow.repository.FollowingRepository;
import com.mansun.features.user.repository.UserRepository;
import com.mansun.requestDto.follow.AddFollowReqDto;
import com.mansun.requestDto.follow.DeleteFollowReqDto;
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
public class FollowingServiceImpl implements FollowingService {
    private final UserRepository userRepository;
    private final FollowingRepository followingRepository;
    private final FollowerRepositoy followerRepository;

    public void addFollow(CustomUserDetails customUserDetails, AddFollowReqDto req) {
        Users user = userRepository.findById(req.getUser_id()).orElseThrow(
        );
        followingRepository.save(Following.builder()
                .user(new Users(customUserDetails))
                .followingUser(new Users(req.getUser_id()))
                .build());

        followerRepository.save(Follower.builder()
                .user(new Users(customUserDetails))
                .followerUser(new Users(req.getUser_id()))
                .build());

    }


    public List<GetMyFollowingResDto> findMyFollwingList(
            CustomUserDetails customUserDetails
    ) {
        List<Following> followingList =
                followingRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        List<Users> userList = new ArrayList<>();
        for (Following f : followingList) {
            userList.add(userRepository.findById(f.getFollowingUser().getUserId()).orElseThrow());
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

    public void deleteFollow(CustomUserDetails customUserDetails, DeleteFollowReqDto req) {
        Users user = userRepository.findById(req.getUser_id()).orElseThrow(
        );
        followingRepository.delete(Following.builder()
                .user(new Users(customUserDetails))
                .followingUser(new Users(req.getUser_id()))
                .build());

        followerRepository.delete(Follower.builder()
                .user(new Users(customUserDetails))
                .followerUser(new Users(req.getUser_id()))
                .build());

    }
}
