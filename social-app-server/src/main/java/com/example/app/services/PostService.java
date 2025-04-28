package com.example.app.services;

import java.util.List;

import com.example.app.models.Post;

public interface PostService {
	Post createNewPost(Post post, Long userId) throws Exception;

	String deletePost(Long postId, Long userId) throws Exception;

	List<Post> findPostByUserId(Long userId);

	Post findPostById(Long postId) throws Exception;

	List<Post> findAllPosts();

	Post savedPost(Long postId, Long userId) throws Exception;

	Post likePost(Long postId, Long userId) throws Exception;
}
