package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Long> {
	
	public List<Reels> findByUserId(Long userId);
}
