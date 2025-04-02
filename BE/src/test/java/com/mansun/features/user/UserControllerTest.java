package com.mansun.features.user;

import com.mansun.entity.Users;
import com.mansun.features.user.service.UserService;
import com.mansun.features.user.service.UserServiceImpl;
import com.mansun.requestDto.user.CreateUserReqDto;
import org.apache.catalina.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserServiceImpl userService;

    @Test
    void createUser() {
        CreateUserReqDto user= CreateUserReqDto.builder()
                .email("test@naver.com")
                .password(new BCryptPasswordEncoder().encode("test_password"))
                .phoneNum("01012341234")
                .name("test_username")
                .build();

        userService.createUser(user);
    }

    @Test
    void setNickname() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void checkDuplicateNickname() {
    }

    @Test
    void getMyInformation() {
    }

    @Test
    void getTheOtherOneInformation() {
    }

    @Test
    void getMyFollowingList() {
    }

    @Test
    void getMyFollowerList() {
    }
}