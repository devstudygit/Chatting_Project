package com.example.contact.contact.dto;

import com.example.contact.contact.entity.Contact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDto {
    private Long id;
    private String senderName;
    private Long senderId;
    private String receiverName;
    private Long receiverId;
    private String content;
    private String status;
    private boolean confirm;
    private boolean edit;

    public static ContactDto dto(Contact contact){
        ContactDto contactDto = ContactDto.builder()
                .id(contact.getId())
                .content(contact.getContent())
                .senderName(contact.getSender().getName())
                .senderId(contact.getSender().getId())
                .receiverName(contact.getReceiver().getName())
                .receiverId(contact.getReceiver().getId())
                .status(contact.getStatus().toString())
                .confirm(contact.isConfirm())
                .edit(contact.isEdit())
                .build();
        return contactDto;
    }
}
