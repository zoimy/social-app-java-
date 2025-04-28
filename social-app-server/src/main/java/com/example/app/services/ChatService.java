package com.example.app.services;

import java.util.List;

import com.example.app.models.Chat;
import com.example.app.models.User;

public interface ChatService  {
	
	public Chat createChat(User user1, User user2);

	public Chat findChatById(Long chatId) throws Exception;

	public List<Chat> findUsersChat(Long userId) ;
}
