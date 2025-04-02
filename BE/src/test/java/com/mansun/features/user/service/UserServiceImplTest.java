package com.mansun.features.user.service;

import com.mansun.entity.Users;
import com.mansun.features.user.repository.UserRepository;
import com.mansun.requestDto.user.CreateUserReqDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserServiceImpl userService;

    @Test
    void createUser() {
        Users user= Users.builder()
                .email("test@naver.com")
                .password(new BCryptPasswordEncoder().encode("test_password"))
                .phoneNum("01001230123")
                .username("test_username")
                .nickname("test_nickname")
                .role("USER")

                .build();
        userRepository.save(user);
    }

    @Test
    void setNickname() {
    }

    @Test
    void loadUserByUsername() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void findByNickname() {
    }

    @Test
    void findById() {
    }

    @Test
    void findTheOtherOneInfo() {
    }

    @Test
    void getMyFollowingFindById() {
    }

    @Test
    void getMyFollowerFindById() {
    }
}