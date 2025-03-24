package com.mansun.common.auth;

import com.mansun.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.parameters.P;
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
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public Long getUserId(){
        return user.getUserId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }
}