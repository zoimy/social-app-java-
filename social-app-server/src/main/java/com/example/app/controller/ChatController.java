package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Chat;
import com.example.app.models.User;
import com.example.app.request.CreateChatRequest;
import com.example.app.services.ChatService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/api")
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;

	@PostMapping("/chats")
	public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest req){

		User user = userService.findUserByJwt(jwt);
		User user2 = userService.findUserById(req.getUserId());
		Chat chat = chatService.createChat(user, user2);

		return chat;
	}

	@GetMapping("/chats")
	public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);

		List<Chat> chats = chatService.findUsersChat(user.getId());

		return chats;
	}
}
