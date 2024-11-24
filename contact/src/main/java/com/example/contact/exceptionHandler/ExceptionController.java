package com.example.contact.exceptionHandler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalException(IllegalArgumentException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(CustomException.class) // ①
    public ResponseEntity<Object> handleCustomException(CustomException e) {
        return ResponseEntity.status(e.getHttpStatus())
                .body(e.getMessage());
    }

//    private ErrorResponse makeErrorResponse(ErrorCode errorCode) {
//        return ErrorResponse.builder()
//                .code(errorCode.getName())
//                .message(errorCode.getMessage())
//                .build();
//    }
//    private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode) {
//        return ResponseEntity.status(errorCode.getHttpStatus())
//                .body(errorCode.getMessage());
//    }
}
