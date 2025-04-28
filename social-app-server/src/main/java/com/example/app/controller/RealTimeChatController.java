package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.app.models.Message;

@Controller
public class RealTimeChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/chat/{chatId}")
	public Message sendToUser(
			@Payload Message message,
			@DestinationVariable String chatId) {

		simpMessagingTemplate.convertAndSendToUser(chatId, "/private", message);
		// simpMessagingTemplate.convertAndSend("/chat/" + chatId + "/private", message);

		return message;
	}
}
