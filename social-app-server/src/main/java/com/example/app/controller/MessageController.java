package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Message;
import com.example.app.models.User;
import com.example.app.services.MessageService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/api")
public class MessageController {

	@Autowired
	private UserService userService;

	@Autowired
	private MessageService messageService;

	@PostMapping("/messages/chat/{chatId}")
	public Message createMessage(@RequestHeader("Authorization") String jwt, @PathVariable("chatId") Long chatId,
			@RequestBody Message req) throws Exception {

		User user = userService.findUserByJwt(jwt);

		Message message = messageService.createMessage(user, chatId, req);

		return message;
	}

	@GetMapping("/messages/chat/{chatId}")
	public List<Message> findChatMessages(@PathVariable("chatId") Long chatId) {

		List<Message> messages = messageService.findChatMessages(chatId);

		return messages;
	}
}
