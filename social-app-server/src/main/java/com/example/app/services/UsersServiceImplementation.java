package com.example.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.config.JwtProvider;
import com.example.app.models.User;
import com.example.app.repository.UserRepository;
import com.example.app.request.UpdateUserRequest;

@Service
public class UsersServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepo;

	@Override
	public User registerUser(User user) {
		User newUser = new User();

		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());

		User savedUser = userRepo.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Long id) {
		Optional<User> user = userRepo.findById(id);

		if (user.isPresent()) {
			return user.get();
		}

		throw new UnsupportedOperationException("user was not found with id: " + id);
	}

	@Override
	public User findUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	@Override
	public User followUser(Long id1, Long id2) {
		User user1 = findUserById(id1);
		User user2 = findUserById(id2);

		user1.getFollowings().add(user2.getId());
		user2.getFollowers().add(user1.getId());

		userRepo.save(user1);
		userRepo.save(user2);

		return user1;
	}

	@Override
	public User updateUser(UpdateUserRequest user, Long id) {
		User existingUser = findUserById(id);

		if (user.getFirstName() != null)
			existingUser.setFirstName(user.getFirstName());
		if (user.getLastName() != null)
			existingUser.setLastName(user.getLastName());
		if (user.getEmail() != null)
			existingUser.setEmail(user.getEmail());
		if (user.getPassword() != null)
			existingUser.setPassword(user.getPassword());
		if (user.getGender() != null)
			existingUser.setGender(user.getGender());

		return userRepo.save(existingUser);
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepo.searchUser(query);
	}

	@Override
	public String deleteUser(Long id) {
		try {
			userRepo.deleteById(id);
			return "User deleted successfully";
		} catch (Exception e) {
			throw new RuntimeException("User not found with id " + id);
		}
	}

	@Override
	public User findUserByJwt(String jwt) {
		
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		User  user = userRepo.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found for token");
	}

		return user;
	}

}
