package com.example.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostDTO {
	private Long id;
	private String caption;
	private String image;
	private String video;
	private LocalDateTime createdAt;
	private List<CommentDTO> comments;
	private List<Long> likedUserIds;

	public PostDTO(Long id, String caption, String image, String video, LocalDateTime createdAt, List<Long> likedUserIds, List<CommentDTO> comments) {
		this.id = id;
		this.caption = caption;
		this.image = image;
		this.video = video;
		this.createdAt = createdAt;
		this.likedUserIds = likedUserIds;
		this.comments = comments;
}
}
