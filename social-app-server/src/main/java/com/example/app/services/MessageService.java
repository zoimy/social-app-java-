package com.example.app.services;

import java.util.List;

import com.example.app.models.Message;
import com.example.app.models.User;

public interface MessageService {
	
	public Message createMessage(User user, Long chatId, Message req) throws Exception;
	public List<Message> findChatMessages(Long chatId);


}
