package com.example.app.services;

import com.example.app.dto.CommentDTO;
import com.example.app.models.Comment;

public interface CommentService {
	
	public CommentDTO createComment(Comment comment, Long postId, Long userId) throws Exception;

	public Comment findCommentById(Long commentId) throws Exception;

	public Comment likeComment(Long commentId, Long userId) throws Exception;
}
