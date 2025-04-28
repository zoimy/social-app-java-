	package com.example.app.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String caption;
	private String image;
	private String video;
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	// @OneToMany
	// @JsonIgnore
	// private List<User> liked = new ArrayList<>();

	@ManyToMany(mappedBy = "liked")
	@JsonIgnore
	private List<User> liked = new ArrayList<>();

	@ManyToMany(mappedBy = "savedPosts")
	@JsonIgnore
	private List<User> savedByUsers = new ArrayList<>();

	@OneToMany()
	@JsonIgnore 
	private List<Comment> comments = new ArrayList<>();
}
