package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Comment;
import com.example.app.models.User;
import com.example.app.services.CommentService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/api")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping("/comment/post/{postId}")
	public Comment createComment(@RequestBody Comment comment, @RequestHeader("Authorization") String jwt,
			@PathVariable("postId") Long postId) throws Exception {

		User user = userService.findUserByJwt(jwt);

		Comment com = commentService.createComment(comment, postId, user.getId());

		return com;
	}

	@GetMapping("/comment/{commentId}")
	public Comment createComment(@PathVariable("commentId") Long commentId) throws Exception {

		Comment com = commentService.findCommentById(commentId);

		return com;
	}

	@PutMapping("/comment/like/{commentId}")
	public Comment likComment(@RequestHeader("Authorization") String jwt, @PathVariable("commentId") Long commentId)
			throws Exception {

		User user = userService.findUserByJwt(jwt);

		Comment com = commentService.likeComment(commentId, user.getId());

		return com;
	}
}
