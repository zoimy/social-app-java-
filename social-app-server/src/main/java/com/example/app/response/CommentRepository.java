package com.example.app.response;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
}
