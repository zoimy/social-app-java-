package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.PostDTO;
import com.example.app.models.Post;
import com.example.app.models.User;
import com.example.app.response.ApiResponse;
import com.example.app.services.PostService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/api")
public class PostController {
	
	@Autowired
	PostService postService;

	@Autowired
	UserService userService;

	@PostMapping("/posts/user")
	public ResponseEntity<Post> createNewPost(@RequestBody Post post, @RequestHeader("Authorization") String jwt)  throws Exception {
		User user = userService.findUserByJwt(jwt);
		Post createdPost  = postService.createNewPost(post, user.getId());

		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost( @PathVariable Long postId,  @RequestHeader("Authorization") String jwt)  throws Exception {

		User user = userService.findUserByJwt(jwt);

		String message =postService.deletePost(postId, user.getId());

		ApiResponse res = new ApiResponse(message, true);

		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}

	@GetMapping("/posts/{postId}")
	public ResponseEntity<Post> findPostById( @PathVariable Long postId)  throws Exception {
		Post post =postService.findPostById(postId);

		return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts/user/{userId}")
	public ResponseEntity<List<Post>> findUsersPost( @PathVariable Long userId) {
		List<Post> posts =postService.findPostByUserId(userId);

		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

	@GetMapping("/posts")
	public ResponseEntity<List<PostDTO>> findAllPosts() {
		List<PostDTO> postResponses = postService.findAllPosts();
    return new ResponseEntity<>(postResponses, HttpStatus.OK);
	}

	@PutMapping("/posts/save/{postId}")
	public ResponseEntity<Post> savedPostHandler( @PathVariable Long postId,  @RequestHeader("Authorization") String jwt)  throws Exception {

		User user = userService.findUserByJwt(jwt);

		Post post = postService.savedPost(postId, user.getId());

		return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
	}

	@PutMapping("/posts/like/{postId}")
	public ResponseEntity<Post> likePostHandler( @PathVariable Long postId,  @RequestHeader("Authorization") String jwt)  throws Exception {

		User user = userService.findUserByJwt(jwt);

		Post post = postService.likePost(postId, user.getId());

		return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
	}
}
