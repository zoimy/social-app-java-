package com.example.app.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.dto.CommentDTO;
import com.example.app.dto.PostDTO;
import com.example.app.models.Post;
import com.example.app.models.User;
import com.example.app.repository.PostRepository;
import com.example.app.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PostServiceImplementation implements PostService {

	@Autowired
	private PostRepository postRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserService userService;

	@Override
	public Post createNewPost(Post post, Long userId) throws Exception {

		Post newPost = new Post();
		User user = userService.findUserById(userId);

		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setVideo(post.getVideo());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setUser(user);

		return postRepo.save(newPost);
	}

	@Override
	public String deletePost(Long postId, Long userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (post.getUser().getId() != user.getId()) {
			throw new Exception("Id in deleting are not equal ");
		}

		postRepo.deleteById(postId);
		return "Post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Long userId) {
		return postRepo.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Long postId) throws Exception {
		Optional<Post> post = postRepo.findById(postId);

		if (post.isEmpty()) {
			throw new Exception("No post found with id: " + postId);
		}

		return post.get();
	}

	@Override
	public List<PostDTO> findAllPosts() {
		List<Post> posts = postRepo.findAll();
		return posts.stream().map(post -> new PostDTO(
				post.getId(),
				post.getCaption(),
				post.getImage(),
				post.getVideo(),
				post.getCreatedAt(),
				post.getLiked().stream().map(User::getId).toList(),
				post.getComments().stream()
						.map(comment -> new CommentDTO(comment.getId(), comment.getPost().getId(), comment.getUser().getId(),
								comment.getContent(), comment.getCreatedAt(), comment.getLiked().stream().map(User::getId).toList()))
						.toList()))
				.toList();
	}

	@Override
	public Post savedPost(Long postId, Long userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (user.getSavedPosts().contains(post)) {
			user.getSavedPosts().remove(post);
		} else {
			user.getSavedPosts().add(post);
		}

		userRepo.save(user);

		return post;
	}

	@Override
	public Post likePost(Long postId, Long userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		} else {
			post.getLiked().add(user);
		}

		if (post.getLiked().contains(user)) {
			if (!user.getLiked().contains(post)) {
				user.getLiked().add(post);
			}
		} else {
			user.getLiked().remove(post);
		}

		postRepo.save(post);
		userRepo.save(user);

		return post;
	}

}
