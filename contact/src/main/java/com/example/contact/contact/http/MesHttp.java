package com.example.contact.contact.http;

import com.example.contact.contact.dto.ContactDto;
import com.example.contact.contact.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mes")
public class MesHttp {
    private final MessageService messageService;

    @PutMapping("{mesId}")
    public ContactDto confirmMes(@PathVariable("mesId") Long mesId){
        return messageService.confirmMes(mesId);
    }

    @GetMapping("/check/{mesId}")
    public boolean checkMes(@PathVariable("mesId") Long mesId){
        return messageService.checkMes(mesId);
    }

    @GetMapping("count")
    public Integer numOfSender(){
        return messageService.numOfSender();
    }

    @GetMapping("count/{senderId}")
    public Integer numOfMes(@PathVariable("senderId") Long senderId){
        return messageService.numOfMes(senderId);
    }
}
