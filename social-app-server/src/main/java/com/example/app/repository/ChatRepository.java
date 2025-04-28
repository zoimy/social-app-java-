package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.app.models.Chat;
import com.example.app.models.User;

public interface ChatRepository extends JpaRepository<Chat, Long> {
	
	public List<Chat> findByUsersId(Long userId);

	@Query("select c from Chat c where :user Member of c.users And :reqUser Member of c.users")
	public Chat findChatByUsersId(@Param("user") User user, @Param("reqUser") User reqUser);
}
