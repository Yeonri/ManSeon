package com.mansun.features.user.repository;

import com.mansun.entity.Users;

import java.util.List;

public interface customRepository {
    List<Users> findMyFollowingList(Long userId);

    List<Users> findMyFollowerList(Long userId);
}
