package com.example.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
}
