package com.example.app.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Chat;
import com.example.app.models.User;
import com.example.app.repository.ChatRepository;

@Service
public class ChatServiceImplementation implements ChatService{

	@Autowired
	private ChatRepository chatRepo;

	@Override
	public Chat createChat(User user1, User user2) {

		Chat existingChat  = chatRepo.findChatByUsersId(user1, user2);
		
		if (existingChat != null) {
			return existingChat;
		}

		Chat chat = new Chat();
		chat.getUsers().add(user1);
		chat.getUsers().add(user2);
		chat.setTimestamp(LocalDateTime.now());

		return chatRepo.save(chat);
		
	}

	@Override
	public Chat findChatById(Long chatId) throws Exception{
		Optional<Chat> chat  = chatRepo.findById(chatId);

		if (chat.isEmpty()) {
			throw new Exception("Chat with id: " + chatId + " was not found");
		}
		
		return chat.get(); 
	}

	@Override
	public List<Chat> findUsersChat(Long userId) {
		
		return chatRepo.findByUsersId(userId);
	}
	
}
