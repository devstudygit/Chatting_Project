package com.example.contact.authentication.user.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class URequestDto {
    private Long id;
    private String username;
    private String password;
    private String checkPw;
    private String newPw;
    private String name;
}
