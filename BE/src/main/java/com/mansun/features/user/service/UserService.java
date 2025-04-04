package com.mansun.features.user.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.SetNicknameReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import com.mansun.responseDto.user.GetMyInfoResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface UserService {
    //회원가입 로직
    void createUser(CreateUserReqDto userParam);

    void setNickname(SetNicknameReqDto nicknameReqDto);

    //회원 정보 수정
    Users updateUser(CustomUserDetails customUserDetails, UpdateUserReqDto userParam);

    GetMyInfoResDto findById(CustomUserDetails customUserDetails);

    //회원 정보 삭제
    void deleteUser(Long userId);
}
