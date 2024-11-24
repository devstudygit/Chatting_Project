package com.example.contact.contact.socket;

import com.example.contact.contact.dto.ContactDto;
import com.example.contact.contact.dto.ContactRequestDto;
import com.example.contact.contact.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class MesSocket {
    private final MessageService messageService;
    @MessageMapping("/new")
    @SendTo("/topic/new")
    public ContactDto newMes(ContactRequestDto dto){
        return messageService.newMes(dto);
    }

    @MessageMapping("/edit")
    @SendTo("/topic/edit")
    public ContactDto edit(ContactRequestDto dto){
        return messageService.editMes(dto);
    }

    @MessageMapping("/remove")
    @SendTo("/topic/remove")
    public Long remove(ContactRequestDto dto){
        return messageService.removeMes(dto);
    }

    @MessageMapping("/confirm")
    @SendTo("/topic/confirm")
    public ContactDto confirm(ContactRequestDto dto){
        return messageService.confirmMes(dto.getId());
    }
}
