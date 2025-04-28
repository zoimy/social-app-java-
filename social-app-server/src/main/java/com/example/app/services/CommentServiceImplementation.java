package com.example.app.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Comment;
import com.example.app.models.Post;
import com.example.app.models.User;
import com.example.app.repository.PostRepository;
import com.example.app.response.CommentRepository;

@Service
public class CommentServiceImplementation implements CommentService{

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@Autowired
	private CommentRepository commentRepo;

	@Autowired
	private PostRepository postRepo;

	@Override
	public Comment createComment(Comment comment, Long postId, Long userId) throws Exception{

		User user   = userService.findUserById(userId);
		Post post  = postService.findPostById(postId);

		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());

		Comment savedComment = commentRepo.save(comment);

		post.getComments().add(savedComment);
		postRepo.save(post);

		return savedComment;
	}

	@Override
	public Comment findCommentById(Long commentId) throws Exception{
		Optional<Comment> com = commentRepo.findById(commentId);

		if (com.isEmpty()) {
			throw new Exception("comment does not exist with id: " + commentId);
		}

		return com.get();
	}

	@Override
	public Comment likeComment(Long commentId, Long userId) throws Exception{
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);

		if (!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		} else comment.getLiked().remove(user);

		return commentRepo.save(comment);
	}
	
}
