package com.example.contact.exceptionHandler;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Builder
@Data
public class ErrorCode {
//    private String name;
    private HttpStatus httpStatus;
    private String message;
}
