package com.example.app.services;

import java.util.List;

import com.example.app.models.User;
import com.example.app.request.UpdateUserRequest;

public interface UserService  {

	public User registerUser(User user);

	public User findUserById(Long id);

	public User findUserByEmail(String email);

	public User followUser(Long id1, Long id2);

	public User updateUser(UpdateUserRequest user , Long id);

	public String deleteUser( Long id);

	public List<User> searchUser(String query);

	public User findUserByJwt(String jwt);

}
