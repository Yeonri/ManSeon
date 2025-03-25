package com.mansun.features.user.service;

import com.mansun.common.exception.NicknameAlreadyExistsException;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.Users;
import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import com.mansun.features.badge.repository.UserBadgeRepository;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.follow.repository.FollowingRepository;
import com.mansun.features.user.repository.*;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import com.mansun.requestDto.user.GetTheOtherOneInfoReqDto;
import com.mansun.responseDto.user.GetMyInfoResDto;
import com.mansun.responseDto.user.GetTheOtherOneInfoResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final FollowerRepositoy followerRepositoy;
    private final FollowingRepository followingRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public void createUser(CreateUserReqDto userParam) {
        //중복 Email이 있을 경우 회원가입 불허
        boolean existUser=userRepository.existsByEmail(userParam.getEmail());
        if(existUser){
            return;
        }
        //이 시점부터는 중복 회원이 없다고 판명
        //비밀번호 인코딩을 위한 BCrypt Encoder ->  추가 변동 가능성 있음 Argon을 적용해볼까 하는 고민이 있음

        userRepository.save(Users.builder()
                        .email(userParam.getEmail())
                        .password(bCryptPasswordEncoder.encode(userParam.getPassword()))
                        .nickname(userParam.getNickname())
                        .username(userParam.getName())
                        .phoneNum(userParam.getPhoneNum())
                        .build());

    }

    //해당 부분이 로그인이다 Spring Security에서 override해서 불러온다
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user=userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("로그인할 사용자가 없습니다. 회원가입을 먼저 진행해주세요."));
//        System.out.println("loadUserByUsername Check"+" "+user.getUserName()+" "+user.getEmail());

        return new CustomUserDetails(user);
    }

    @Override
    public Users updateUser(CustomUserDetails customUserDetails, UpdateUserReqDto req) {
        //변경할 사용자를 찾는다
        Users findUser = userRepository.findByUserIdAndEmail(customUserDetails.getUserId(), customUserDetails.getUsername())
                .orElseThrow(()-> new NoSuchElementException("변경할 사용자가 없습니다."));

        //사용자의 정보를 변경한다
        BeanUtils.copyProperties(req,findUser,NullAwareBeanUtils.getNullPropertyNames(req));

        //여기엔 PATCH이므로 어떤 User정보가 바뀔지 모른다.
        return findUser;
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
    
    public GetMyInfoResDto findById(CustomUserDetails customUserDetails) {
        Users findUser = userRepository.findById(customUserDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다"));
        List<UserBadge> myBadgeList = userBadgeRepository.findByUser_UserId(customUserDetails.getUserId());
        List<Board> myBoardList = boardRepository.findByUser_UserId(customUserDetails.getUserId());

        System.out.println("Last");
        return GetMyInfoResDto
                .builder()
                .email(findUser.getEmail())
                .username(findUser.getUsername())
                .nickname(findUser.getNickname())
                .myBadgeList(myBadgeList)
                .myBoardList(myBoardList)
                .build();
    }

    public GetTheOtherOneInfoResDto findTheOtherOneInfo(
            CustomUserDetails customUserDetails,
            Long userId
    ){
        Users user=   userRepository.findById(userId).orElseThrow(
                ()-> new NoSuchElementException("찾는 사람이 없습니다")
        );
        List<UserBadge> BadgeList = userBadgeRepository.findByUser_UserId(userId);
        List<Board> BoardList = boardRepository.findByUser_UserId(userId);

        return GetTheOtherOneInfoResDto
                .builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .badgeList(BadgeList)
                .boardList(BoardList)
        .build();
    }


//    public List<getMyFollowingResDto> getMyFollowingFindById(CustomUserDetails customUserDetails){
//        List<Following> followingList=followingRepository.findByUser_UserId(customUserDetails.getUserId());
//        return followingList.stream().map(
//                u->getMyFollowingResDto
//                        .builder()
//                        .friendId(u.getUserId())
//                        .email(u.getEmail())
//                        .name(u.getUserName())
//                        .nickname(u.getNickname())
//                        .build()
//        ).collect(Collectors.toList());
//    }

//    public List<getMyFollowerResDto> getMyFollowerFindById(CustomUserDetails customUserDetails){
//        List<Users> followerList=customRepository.findMyFollowerList(customUserDetails.getUserId());
//        return followerList.stream().map(
//                u->getMyFollowerResDto
//                        .builder()
//                        .friendId(u.getUserId())
//                        .email(u.getEmail())
//                        .name(u.getUserName())
//                        .nickname(u.getNickname())
//                        .build()
//        ).collect(Collectors.toList());
//    }
}