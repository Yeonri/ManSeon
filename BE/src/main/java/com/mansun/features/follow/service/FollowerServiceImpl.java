package com.mansun.features.follow.service;

import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.follow.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowerServiceImpl implements FollowerService {
    private final FollowerRepositoy followerRepositoy;
    private final FollowingRepository followingRepository;


}
