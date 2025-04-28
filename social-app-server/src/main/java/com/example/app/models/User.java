package com.example.app.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String gender;

	private List<Long> followers = new ArrayList<>();
	private List<Long> followings = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Post> posts = new ArrayList<>();

	// @ManyToMany
	// @JsonIgnore
	// private List<Post> savedPosts = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "users_saved_posts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
	@JsonIgnore
	private List<Post> savedPosts = new ArrayList<>();

	// @OneToMany(cascade = CascadeType.ALL)
	// @JoinTable(name = "posts_liked", joinColumns = @JoinColumn(name =
	// "liked_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
	// @JsonIgnore
	// private List<Post> liked = new ArrayList<>();
	@ManyToMany
	@JoinTable(name = "user_likes_post", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
	@JsonIgnore
	private List<Post> liked = new ArrayList<>();
}
