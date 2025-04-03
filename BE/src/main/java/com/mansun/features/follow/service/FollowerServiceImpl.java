package com.mansun.features.follow.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.follow.Follower;
import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.user.repository.UserRepository;
import com.mansun.responseDto.follow.GetMyFollowerResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowerServiceImpl implements FollowerService {
    private final FollowerRepositoy followerRepositoy;
    private final UserRepository userRepository;

    public List<GetMyFollowerResDto> findMyFollowerList(
            CustomUserDetails customUserDetails
    ) {
//        내 팔로워의 userId 리스트를 불러온다.
        List<Follower> followerList =
                followerRepositoy.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());

        List<Users> userList = new ArrayList<>();
        for (Follower f : followerList) {
            userList.add(userRepository.findById(f.getFollower().getUserId()).orElseThrow());
        }


        return userList
                .stream()
                .map(
                        u -> GetMyFollowerResDto.builder()
                                .userId(customUserDetails.getUserId())
                                .followerId(u.getUserId())
                                .name(u.getUsername())
                                .build()
                )
                .collect(Collectors.toList());
    }
}
