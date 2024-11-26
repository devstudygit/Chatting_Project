package com.example.contact.contact.service;

import com.example.contact.authentication.component.UserComponent;
import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.contact.dto.ContactDto;
import com.example.contact.contact.dto.ContactRequestDto;
import com.example.contact.contact.entity.Contact;
import com.example.contact.contact.repo.ContactRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CallService {
    private final ContactRepo contactRepo;
    private final UserComponent userComponent;

    public boolean checkAvailable(Long receiverId){
        UserInfo receiver = userComponent.userById(receiverId);
        Optional<Contact> contact = contactRepo.existCall(receiver);
        if (contact.isPresent()) return false;
        return true;
    }

    public ContactDto makeCall(ContactRequestDto dto){
        UserInfo sender = userComponent.userById(dto.getSenderId());
        UserInfo receiver = userComponent.userById(dto.getReceiverId());
        Contact contact = Contact.builder()
                .sender(sender)
                .receiver(receiver)
                .status(Contact.Status.Connecting)
                .build();
        return ContactDto.dto(contactRepo.save(contact));
    }

    public ContactDto onCall(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow();
        contact.setStatus(Contact.Status.OnCall);
        return ContactDto.dto(contactRepo.save(contact));
    }

    public ContactDto hangup(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow();
        contact.setStatus(Contact.Status.Hangup);
        return ContactDto.dto(contactRepo.save(contact));
    }

    public ContactDto reject(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow();
        contact.setStatus(Contact.Status.Reject);
        return ContactDto.dto(contactRepo.save(contact));
    }

    public ContactDto missCall(ContactRequestDto dto){
        Contact contact = contactRepo.findById(dto.getId()).orElseThrow();
        contact.setStatus(Contact.Status.Miss);
        return ContactDto.dto(contactRepo.save(contact));
    }
}
