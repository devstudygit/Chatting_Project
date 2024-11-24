package com.example.contact.contact.http;

import com.example.contact.contact.dto.ContactDto;
import com.example.contact.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat-box")
public class ContactHttp {
    private final ContactService contactService;
    @GetMapping("{receiverId}")
    public List<ContactDto> chatBox(@PathVariable("receiverId") Long receiverId){
        return contactService.chatBox(receiverId);
    }
}
