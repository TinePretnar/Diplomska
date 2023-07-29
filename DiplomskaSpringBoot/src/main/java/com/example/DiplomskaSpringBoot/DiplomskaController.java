package com.example.DiplomskaSpringBoot;

import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.entity.User;
import com.example.DiplomskaSpringBoot.service.OdlagaliscaService;
import com.example.DiplomskaSpringBoot.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/odlagalisca")
public class DiplomskaController {

    private final OdlagaliscaService odlagaliscaService;
    private final UserService userService;

    public DiplomskaController(OdlagaliscaService odlagaliscaService, UserService userService) {
        this.odlagaliscaService = odlagaliscaService;
        this.userService = userService;
    }

    @GetMapping
    public List<Odlagalisca> getOdlagalisca() {
        return odlagaliscaService.getOdlagalisca();
    }

    @GetMapping("/user/checkEmail")
    public boolean checkEmailExists(@RequestParam String email) {
        return userService.checkEmailExists(email);
    }

    @PostMapping("/user/register")
    public User registerUser(@RequestBody User user) {
        // Hash the user's password before saving
        String hashedPassword = PasswordHasher.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        return userService.saveUser(user);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User storedUser = userService.getUserByEmail(user.getEmail());

        if (storedUser != null && PasswordHasher.verifyPassword(user.getPassword(), storedUser.getPassword())) {
            // If email and password match, return the user object (exclude the password for security)
            storedUser.setPassword(null);
            return ResponseEntity.ok(storedUser);
        } else {
            // If authentication fails, return a 401 Unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: Incorrect email or password.");
        }
    }
}

