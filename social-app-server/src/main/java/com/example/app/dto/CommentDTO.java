package com.example.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
	private Long id;
	private Long postId;
	private Long userId;
	private String content;
	private LocalDateTime createdAt;
	private List<Long> likedUserIds;
}
