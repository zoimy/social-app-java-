package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
	
	public List<Message> findByChatId(Long chatId);
}
