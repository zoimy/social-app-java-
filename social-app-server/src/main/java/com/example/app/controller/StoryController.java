package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Story;
import com.example.app.models.User;
import com.example.app.services.StoryService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/api")
public class StoryController {

	@Autowired
	private StoryService storyService;

	@Autowired
	private UserService userService;

	@PostMapping("/story")
	public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);

		Story createdStory = storyService.createStory(story, user);

		return createdStory;
	}

	@GetMapping("/story/user/{userId}")
	public List<Story> findUsersStory(@PathVariable("userId") Long userId) throws Exception {

		List<Story> stories = storyService.findStoryByUserId(userId);

		return stories;
	}
}
