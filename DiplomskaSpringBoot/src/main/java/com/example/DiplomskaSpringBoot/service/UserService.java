package com.example.DiplomskaSpringBoot.service;

import com.example.DiplomskaSpringBoot.entity.User;
import com.example.DiplomskaSpringBoot.repository.UserRepository;
import com.example.DiplomskaSpringBoot.PasswordHasher;
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
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && PasswordHasher.verifyPassword(password, user.getPassword())) {
            return user;
        }
        return null; // Return null if email doesn't exist or password doesn't match
    }

    // Add more service methods as needed
}
