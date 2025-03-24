package com.mansun.features.user.service;

import com.mansun.common.exception.NicknameAlreadyExistsException;
import com.mansun.entity.Users;
import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.user.repository.userRepository;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final userRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public void createUser(CreateUserReqDto userParam) {
        //중복 Email이 있을 경우 회원가입 불허
        boolean existUser=userRepository.existsByUserIdAndEmail(Long.valueOf(0),userParam.getEmail());
        if(existUser){

            return;
        }
        //이 시점부터는 중복 회원이 없다고 판명

        //비밀번호 인코딩을 위한 BCrypt Encoder ->  추가 변동 가능성 있음 Argon을 적용해볼까 하는 고민이 있음
        String encodedPassword = bCryptPasswordEncoder.encode(userParam.getPassword());
    }

    //해당 부분이 로그인이다 Spring Security에서 override해서 불러온다
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return new CustomUserDetails(userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("로그인할 사용자가 없습니다. 회원가입을 먼저 진행해주세요.")));
    }

    public Users updateUser(CustomUserDetails customUserDetails, UpdateUserReqDto req) {
        //변경할 사용자를 찾는다
        Users findUser = userRepository.findByUserIdAndEmail(customUserDetails.getUserId(), customUserDetails.getUsername())
                .orElseThrow(()-> new NoSuchElementException("변경할 사용자가 없습니다."));
        
        //사용자의 정보를 변경한다 
        //미구현

        //여기엔 PATCH이므로 어떤 User정보가 바뀔지 모른다.
        return null;
    }

    @Override
    public void deleteUser(Long userId) {
//        IllegalStateException이 뜨면 없는 ID이므로 처리 근데 거의 없을 거임
        userRepository.deleteById(userId);
    }

    public void findByNickname(String nickname){
       userRepository.findByNickname(nickname)
               .ifPresent(user->{throw new NicknameAlreadyExistsException("닉네임이 이미 존재합니다");
               });
    }
}