package com.example.app.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Story;
import com.example.app.models.User;
import com.example.app.repository.StoryRepository;

@Service
public class StoryServiceImplementation implements StoryService {

	@Autowired
	private StoryRepository storyRepo;

	@Override
	public Story createStory(Story story, User user) {
		
		Story newStory = new Story();

		newStory.setCaptions(story.getCaptions());
		newStory.setImage(story.getImage());
		newStory.setTimestamp(LocalDateTime.now());
		newStory.setUser(user);

		return storyRepo.save(newStory);
	}

	@Override
	public List<Story> findStoryByUserId(Long userId) throws Exception {
		return storyRepo.findByUserId(userId);
	}
	
}
