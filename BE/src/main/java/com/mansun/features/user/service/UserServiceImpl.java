package com.mansun.features.user.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.exception.NicknameAlreadyExistsException;
import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.QUsers;
import com.mansun.entity.Users;
import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import com.mansun.entity.follow.QFollower;
import com.mansun.entity.follow.QFollowing;
import com.mansun.features.badge.repository.UserBadgeRepository;
import com.mansun.features.board.repository.BoardRepository;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.follow.repository.FollowerRepositoy;
import com.mansun.features.follow.repository.FollowingRepository;
import com.mansun.features.user.repository.UserRepository;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.SetNicknameReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import com.mansun.responseDto.follow.GetMyFollowerResDto;
import com.mansun.responseDto.follow.GetMyFollowingResDto;
import com.mansun.responseDto.user.getmyinfo.GetMyInfoResDto;
import com.mansun.responseDto.user.GetTheOtherOneInfoResDto;
import com.mansun.responseDto.user.VerifyEmailResDto;
import com.mansun.responseDto.user.VerifyPhoneNumResDto;
import com.mansun.responseDto.user.getmyinfo.PostResDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneOffset;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final EntityManager em;

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final FollowerRepositoy followerRepositoy;
    private final FollowingRepository followingRepository;
    private final FishRepository fishRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void createUser(CreateUserReqDto userParam) {
        //중복 Email이 있을 경우 회원가입 불허
        if (userRepository.existsByEmailAndDeletedFalse(userParam.getEmail())) {
            throw new DuplicateKeyException("이미 해당 Email로 가입한 회원이 있습니다.");
        }        //이 시점부터는 중복 회원이 없다고 판명
        if(userParam.getName()==null){
            throw new NoSuchElementException("이름이 없습니다.");
        }
        //비밀번호 인코딩을 위한 BCrypt Encoder ->  추가 변동 가능성 있음 Argon을 적용해볼까 하는 고민이 있음
        userRepository.save(Users.builder()
                .email(userParam.getEmail())
                .password(bCryptPasswordEncoder.encode(userParam.getPassword()))
//                        .nickname(userParam.getNickname())
                .username(userParam.getName())
                .phoneNum(userParam.getPhoneNum())
                .role("USER")
                .build());
    }

//    public void createUserByKakao(CreateUserByKakaoReqDto userParam) {
//        //중복 Email이 있을 경우 회원가입 불허
//        if (userRepository.existsByEmail(userParam.getEmail())) {
//            userRepository.findByEmail(userParam)
//
//
//            throw new DuplicateKeyException("이미 해당 Email로 가입한 회원이 있습니다.");
//        }        //이 시점부터는 중복 회원이 없다고 판명
//        //비밀번호 인코딩을 위한 BCrypt Encoder ->  추가 변동 가능성 있음 Argon을 적용해볼까 하는 고민이 있음
//        userRepository.save(Users.builder()
//                .email(userParam.getEmail())
//                .password(bCryptPasswordEncoder.encode(userParam.getPassword()))
////                        .nickname(userParam.getNickname())
//                .username(userParam.getName())
//                .phoneNum(userParam.getPhoneNum())
//                .role("USER")
//                .build());
//    }

    public void setNickname(SetNicknameReqDto nicknameReqDto) {
        Users user = userRepository.findByEmailAndDeletedFalse(nicknameReqDto.getEmail()).orElseThrow();
        user.setNickname(nicknameReqDto.getNickname());
    }

    //해당 부분이 로그인이다 Spring Security에서 override해서 불러온다
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() -> new RuntimeException("로그인할 사용자가 없습니다. 회원가입을 먼저 진행해주세요."));
//        System.out.println("loadUserByUsername Check"+" "+user.getUserName()+" "+user.getEmail());

        return new CustomUserDetails(user);
    }

    @Override
    public Users updateUser(CustomUserDetails customUserDetails, UpdateUserReqDto req) {
        //변경할 사용자를 찾는다
        Users findUser = userRepository.findByUserIdAndEmailAndDeletedFalse(customUserDetails.getUserId(), customUserDetails.getUsername())
                .orElseThrow(() -> new NoSuchElementException("변경할 사용자가 없습니다."));

        //사용자의 정보를 변경한다
        BeanUtils.copyProperties(req, findUser, NullAwareBeanUtils.getNullPropertyNames(req));

        //여기엔 PATCH이므로 어떤 User정보가 바뀔지 모른다.
        return findUser;
    }

    @Override
    public void deleteUser(Long userId) {
//        IllegalStateException이 뜨면 없는 ID이므로 처리 근데 거의 없을 거임
        Users user = userRepository.findById(userId).orElseThrow();
        user.setDeleted(true);
    }

    public void findByNickname(String nickname) {
        userRepository.findByNicknameAndDeletedFalse(nickname)
                .ifPresent(user -> {
                    throw new NicknameAlreadyExistsException("닉네임이 이미 존재합니다");
                });
    }

    @Override
    public GetMyInfoResDto findById(CustomUserDetails customUserDetails) {
        Users findUser = userRepository.findById(customUserDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다"));
        List<UserBadge> myBadgeList = userBadgeRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        List<Board> myBoardList = boardRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());

        return GetMyInfoResDto
                .builder()
                .id(findUser.getUserId())
                .email(findUser.getEmail())
                .name(findUser.getUsername())
                .phone_number(findUser.getPhoneNum())
                .nickname(findUser.getNickname())
                .badges(myBadgeList)
                .badges_cnt(userBadgeRepository.countAllByUser_UserIdAndDeletedFalse(customUserDetails.getUserId()))
                .collection_cnt(fishRepository.countAllByUser_UserId(customUserDetails.getUserId()))
                .posts(myBoardList.stream().map(
                        b-> PostResDto.builder()
                                .title(b.getTitle())
                                .content(b.getContent())
                                .commentNum(b.getCommentNum())
                                .createdAt(b.getCreatedAt().atOffset(ZoneOffset.UTC))
                                .like(b.getLikeNum())
                                .postImg(b.getPostImg())
                                .postId(b.getBoardId())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }

    public GetTheOtherOneInfoResDto findTheOtherOneInfo(
            CustomUserDetails customUserDetails,
            Long userId
    ) {
        Users user = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchElementException("찾는 사람이 없습니다")
        );
        List<UserBadge> BadgeList = userBadgeRepository.findByUser_UserIdAndDeletedFalse(userId);
        List<Board> BoardList = boardRepository.findByUser_UserIdAndDeletedFalse(userId);

        return GetTheOtherOneInfoResDto
                .builder()
                .id(userId)
                .email(user.getEmail())
                .name(user.getUsername())
                .phone_number(user.getPhoneNum())
                .nickname(user.getNickname())
                .badges(BadgeList)
                .badges_cnt(userBadgeRepository.countAllByUser_UserIdAndDeletedFalse(userId))
                .collection_cnt(fishRepository.countAllByUser_UserId(userId))
                .posts(BoardList)
                .build();
    }


    public List<GetMyFollowingResDto> getMyFollowingFindById(CustomUserDetails customUserDetails) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        QUsers users = QUsers.users;
        QFollowing following = QFollowing.following;

        List<Users> followingList = queryFactory
                .select(users)
                .from(following)
                .join(users).on(users.userId.eq(following.followingUser.userId))
                .where(following.user.userId.eq(customUserDetails.getUserId())
                        .and(following.deleted.eq(false)))
                .fetch();

        return followingList.stream().map(
                u -> GetMyFollowingResDto
                        .builder()
                        .followerId(u.getUserId())
                        .email(u.getEmail())
                        .name(u.getUsername())
                        .nickname(u.getNickname())
                        .build()
        ).collect(Collectors.toList());
    }


    public List<GetMyFollowerResDto> getMyFollowerFindById(CustomUserDetails customUserDetails) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        QUsers users = QUsers.users;
        QFollower follower = QFollower.follower;

        List<Users> followerList = queryFactory
                .select(users)
                .from(follower)
                .join(users).on(users.userId.eq(follower.followerUser.userId))
                .where(follower.user.userId.eq(customUserDetails.getUserId())
                        .and(follower.deleted.eq(false)))
                .fetch();
        return followerList.stream().map(
                u -> GetMyFollowerResDto
                        .builder()
                        .followerId(u.getUserId())
                        .email(u.getEmail())
                        .name(u.getUsername())
                        .nickname(u.getNickname())
                        .build()
        ).collect(Collectors.toList());
    }

    public VerifyEmailResDto verifyEmail(String email) {
        Optional<Users> user =
                userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return VerifyEmailResDto.builder()
                    .ableToUse(true)
                    .build();
        } else if (user.get().isDeleted()) {
            user.get().setDeleted(false);
            return VerifyEmailResDto.builder()
                    .ableToUse(true)
                    .build();
        } else {
            return VerifyEmailResDto.builder()
                    .ableToUse(false)
                    .build();
        }
    }

    public VerifyPhoneNumResDto verifyPhoneNumResDto(String phoneNum) {
        Optional<Users> user =
                userRepository.findByPhoneNum(phoneNum);

        if (user.isEmpty()) {
            return VerifyPhoneNumResDto.builder()
                    .ableToUse(true)
                    .build();
        } else if (user.get().isDeleted()) {
            user.get().setDeleted(false);
            return VerifyPhoneNumResDto.builder()
                    .ableToUse(true)
                    .build();
        } else {
            return VerifyPhoneNumResDto.builder()
                    .ableToUse(false)
                    .build();
        }
    }

}