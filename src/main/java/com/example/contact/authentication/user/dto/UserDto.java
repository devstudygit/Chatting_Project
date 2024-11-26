package com.example.contact.authentication.user.dto;

import com.example.contact.authentication.user.entity.Authority;
import com.example.contact.authentication.user.entity.UserInfo;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String avatar;
    private final Set<String> stringAuth = new HashSet<>();

    public static UserDto dto (UserInfo user){
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .avatar(user.getAvatar())
                .build();
        for (Authority authority: user.getAuthorities()){
            userDto.stringAuth.add(authority.getRole());
        }
        return userDto;
    }
}
