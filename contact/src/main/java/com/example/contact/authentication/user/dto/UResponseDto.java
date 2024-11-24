package com.example.contact.authentication.user.dto;

import com.example.contact.authentication.user.entity.Authority;
import com.example.contact.authentication.user.entity.UserInfo;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UResponseDto implements UserDetails {
    private Long id;
    private String username;
    @Setter
    private String password;
    private String name;
    private String avatar;
    private final Set<String> stringAuth = new HashSet<>();

    public static UResponseDto dto (UserInfo user){
        UResponseDto responseDto = UResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .avatar(user.getAvatar())
                .build();
        for (Authority authority: user.getAuthorities()){
            responseDto.stringAuth.add(authority.getRole());
        }
        return responseDto;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.stringAuth.stream().map(SimpleGrantedAuthority::new).toList();
    }
}
