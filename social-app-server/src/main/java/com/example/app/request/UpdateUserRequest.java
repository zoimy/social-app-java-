package com.example.app.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String gender;


}
