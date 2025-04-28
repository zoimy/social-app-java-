package com.example.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Reels;
import com.example.app.models.User;
import com.example.app.repository.ReelsRepository;

@Service
public class ReelsServiceImplementation implements ReelsService {

	@Autowired
	private ReelsRepository reelsRepo;

	@Override
	public Reels createReel(Reels reel, User user) {
		
		Reels newReel = new Reels();

		newReel.setTitle(reel.getTitle());
		newReel.setUser(user);
		newReel.setVideo(reel.getVideo());

		return reelsRepo.save(newReel);
	}

	@Override
	public List<Reels> findAllReels() {
		return reelsRepo.findAll();
	}

	@Override
	public List<Reels> findUserReel(Long userId) {
		return reelsRepo.findByUserId(userId);
	}

}
