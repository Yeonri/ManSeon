package com.mansun.features.follow.service;

import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.follow.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowerServiceImpl implements FollowerService {
    private final FollowerRepositoy followerRepositoy;
    private final FollowingRepository followingRepository;


}
