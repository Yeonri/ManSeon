package com.mansun.common.auth;

import com.mansun.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final Users user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return null;//원래 여기서 getRole이 들어가야 한다.
            }
        });
        return collection;
    }

    //    UserDetails란 Spring Security에서 필터에서 걸러진 이후 값을 읽어낸 사용자의 객체를 읽어내는 구현체다.
//    여기서 ID값을 읽어낼 때는 getUsername을 필수로 구현해야 하기에 불가피하게 getUsername으로 이메일을 불러온다.
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    //    Long 값인 UserId(Primary Key)를 읽는다.
    public Long getUserId() {
        return user.getUserId();
    }

    //    Password값 읽는다.
    @Override
    public String getPassword() {
        return user.getPassword();
    }
}