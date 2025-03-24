package com.mansun.features.user.service;

import com.mansun.requestDto.user.CreateUserReqDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface UserService {
    //회원가입 로직
    public void createUser(CreateUserReqDto userParam);

    //회원 정보 수정
//    public Users updateUser(updateUserReqDto userParam);

    //회원 정보 삭제
    public void deleteUser(Long userId);
}
