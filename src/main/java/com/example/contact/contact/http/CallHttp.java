package com.example.contact.contact.http;

import com.example.contact.contact.service.CallService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/call")
public class CallHttp {
    private final CallService callService;
    @GetMapping("check/{receiverId}")
    public boolean checkAvailable(@PathVariable("receiverId") Long receiverId){
        return callService.checkAvailable(receiverId);
    }
}
