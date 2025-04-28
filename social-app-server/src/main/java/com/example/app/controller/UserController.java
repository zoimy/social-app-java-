package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.exceptions.UserExceptions;
import com.example.app.models.User;
import com.example.app.repository.UserRepository;
import com.example.app.request.UpdateUserRequest;
import com.example.app.services.UsersServiceImplementation;



@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UsersServiceImplementation userService;

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable Long id) throws UserExceptions  {
		return userService.findUserById(id);
	}

	@GetMapping("/users/by-email")
	public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
		User user = userService.findUserByEmail(email);
		return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
	}

	@GetMapping("/users/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		return userService.searchUser(query);
	}

	@PostMapping("/users")
	public User addUser(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@PutMapping("/users")
	public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody UpdateUserRequest data) throws UserExceptions {		
			User user = userService.findUserByJwt(jwt);
			return userService.updateUser(data, user.getId());
		
	}

	@PutMapping("/users/follow/{userId2}")
	public User followUser(@RequestParam("Authorization") String jwt, @PathVariable Long userId2) {
		User user = userService.findUserByJwt(jwt);

		return userService.followUser(user.getId(), userId2);
	}

	@DeleteMapping("/users/{id}")
	public String deleteUser(@PathVariable Long id) {
		return userService.deleteUser(id);
	}

	
	@GetMapping("/users/profile")
	public User getUserFromJwt(@RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);
		
		return user;
	}

}
