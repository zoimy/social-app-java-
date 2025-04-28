package com.example.app.services;

import java.util.List;

import com.example.app.models.Story;
import com.example.app.models.User;

public interface StoryService {
	
	public Story createStory(Story story, User user);

	public List<Story> findStoryByUserId(Long userId) throws Exception;
}
