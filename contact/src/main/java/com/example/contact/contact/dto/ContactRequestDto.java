package com.example.contact.contact.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ContactRequestDto {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;

}
