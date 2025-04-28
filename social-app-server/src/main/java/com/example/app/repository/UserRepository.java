package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.app.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String email);

	@Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) " +
	"OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) " +
	"OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%'))")
	 List<User> searchUser(@Param("query" ) String query);
}
