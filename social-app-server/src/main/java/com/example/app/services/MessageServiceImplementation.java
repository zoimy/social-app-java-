package com.example.app.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Chat;
import com.example.app.models.Message;
import com.example.app.models.User;
import com.example.app.repository.ChatRepository;
import com.example.app.repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService {

	@Autowired
	private ChatService chatService;

	@Autowired
	private ChatRepository chatRepo;

	@Autowired
	private MessageRepository messageRepo;

	@Override
	public Message createMessage(User user, Long chatId, Message req) throws Exception{
		
		Message message = new Message();

		Chat chat = chatService.findChatById(chatId);

		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setTimestamp(LocalDateTime.now());
		message.setUser(user);

		Message resMessage = messageRepo.save(message); 
		chat.getMessages().add(resMessage);
		chatRepo.save(chat);

		return resMessage;
	}

	@Override
	public List<Message> findChatMessages(Long chatId) {
		return messageRepo.findByChatId(chatId);
	}

}
