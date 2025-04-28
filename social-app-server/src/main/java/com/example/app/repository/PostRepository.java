package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.app.models.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	@Query("select n from Post n where n.user.id=:userId ")
	List<Post> findPostByUserId(Long userId);
}
