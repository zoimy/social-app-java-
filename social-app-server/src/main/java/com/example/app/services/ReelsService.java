package com.example.app.services;

import java.util.List;

import com.example.app.models.Reels;
import com.example.app.models.User;

public interface ReelsService {
	
	public Reels createReel(Reels reel, User user);

	public List<Reels> findAllReels();

	public List<Reels> findUserReel(Long userId);
}
