package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.config.JwtProvider;
import com.example.app.models.User;
import com.example.app.repository.UserRepository;
import com.example.app.request.LoginRequest;
import com.example.app.response.AuthResponse;
import com.example.app.services.CustomerUserDetailsService;
import com.example.app.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomerUserDetailsService customerUserDetailsService;

	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {

		User isExist = userService.findUserByEmail(user.getEmail());

		if (isExist != null) {
			throw new Exception("this email has already taken");
		}

		User newUser = new User();

		newUser.setEmail(user.getEmail());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());

		User saved = userRepo.save(newUser);

		Authentication auth = new UsernamePasswordAuthenticationToken(saved.getEmail(), saved.getPassword());

		String token = JwtProvider.generateToken(auth);

		AuthResponse response = new AuthResponse(token, "Register successfully");

		return response;
	}

	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) {

		Authentication auth = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

		String token = JwtProvider.generateToken(auth);

		AuthResponse response = new AuthResponse(token, "Login successfully");

		return response;
	}

	private Authentication authenticate(String email, String password) {

		UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

		if (userDetails == null) {
			throw new BadCredentialsException("invalid username");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("password is wrong");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
