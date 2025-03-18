package com.mansun.features.user.service;

import com.mansun.entity.Users;
import com.mansun.features.user.repository.userRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class userService {
    private final userRepository userRepository;

    public void saveUser(Users user) {
        userRepository.save(user);
    }
}
