package com.mansun.features.oauth.service;

import com.mansun.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2Users implements OAuth2User {

    private final Users user;

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
//                return user.getRole();
                return null;
            }
        });
        return collection;
    }

    @Override
    public String getName() {
        return user.getUsername();
    }

    public String getEmail() {
        return user.getEmail();
    }
}
