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

import com.example.app.models.Reels;
import com.example.app.models.User;
import com.example.app.services.ReelsService;
import com.example.app.services.UserService;


@RestController
@RequestMapping("/api")
public class ReelsController {

	@Autowired
	private ReelsService reelsService;

	@Autowired
	private UserService userService;

	@GetMapping("/reels")
	public List<Reels> findAllReels() {

		return reelsService.findAllReels();
	}

	@PostMapping("/reels")
	public Reels createReel(@RequestBody Reels reel , @RequestHeader("Authorization") String jwt)  {

		User user = userService.findUserByJwt(jwt);

		Reels createdReel = reelsService.createReel(reel, user);

		return createdReel;
	}

	@GetMapping("/reels/user/{userId}")
	public List<Reels> findUsersReels(@PathVariable Long userId)  {

		List<Reels> reels =  reelsService.findUserReel(userId);

		return reels;
	}
}
