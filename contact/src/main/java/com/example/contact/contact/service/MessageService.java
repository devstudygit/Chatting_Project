package com.example.contact.contact.service;

import com.example.contact.authentication.component.UserComponent;
import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.contact.dto.ContactDto;
import com.example.contact.contact.dto.ContactRequestDto;
import com.example.contact.contact.entity.Contact;
import com.example.contact.contact.repo.ContactRepo;
import com.example.contact.exceptionHandler.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final ContactRepo contactRepo;
    private final UserComponent userComponent;

    public ContactDto newMes(ContactRequestDto dto){
        UserInfo sender = userComponent.userById(dto.getSenderId());
        UserInfo receiver = userComponent.userById(dto.getReceiverId());
        Contact contact = Contact.builder()
                .sender(sender)
                .receiver(receiver)
                .content(dto.getContent())
                .confirm(false)
                .edit(false)
                .status(Contact.Status.Message)
                .build();
        return ContactDto.dto(contactRepo.save(contact));
    }

    public ContactDto editMes(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist this message!!")
        );
        contact.setContent(dto.getContent());
        contact.setEdit(true);
        return ContactDto.dto(contactRepo.save(contact));
    }

    public Long removeMes(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist this message!!")
        );
//        if (contact.isConfirm())
//            throw new CustomException(HttpStatus.BAD_REQUEST, "Cannot delete this message!!");
        contactRepo.delete(contact);
        return dto.getId();
    }


    public boolean checkMes(Long id){
        Contact contact = contactRepo.findById(id).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist this message!!")
        );
        return contact.isConfirm();
    }

    public ContactDto confirmMes(Long id){
        Contact contact = contactRepo.findById(id).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist this message!!")
        );
        contact.setConfirm(true);
        return ContactDto.dto(contactRepo.save(contact));
    }

    public Integer numOfSender(){
        UserInfo receiver = userComponent.userLogin();
        return contactRepo.numOfSender(receiver);
    }

    public Integer numOfMes(Long senderId){
        UserInfo sender = userComponent.userById(senderId);
        UserInfo receiver = userComponent.userLogin();
        return contactRepo.numOfMes(sender, receiver);
    }
}
