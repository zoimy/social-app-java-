package com.example.app.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptions {

	// @ExceptionHandler(UserExceptions.class)
	// public ResponseEntity<ErrorDetails> userExceptionHandler(UserExceptions ue, WebRequest req) {

	// 	ErrorDetails error = new ErrorDetails("USser exception !!! - " + ue.getMessage(), req.getDescription(false), LocalDateTime.now());
	// 	return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	// }

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception ex, WebRequest req) {

		ErrorDetails error = new ErrorDetails(ex.getMessage(), req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}
