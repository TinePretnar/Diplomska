package com.example.DiplomskaSpringBoot.service;

import com.example.DiplomskaSpringBoot.entity.User;
import com.example.DiplomskaSpringBoot.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        // Implement logic to save user to the database
        return userRepository.save(user);
    }

    public boolean checkEmailExists(String email) {
        // Implement logic to check if the email exists in the database
        return userRepository.existsByEmail(email);
    }

    // Add more service methods as needed
}
