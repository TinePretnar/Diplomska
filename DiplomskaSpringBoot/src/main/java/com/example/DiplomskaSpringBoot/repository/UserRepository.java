package com.example.DiplomskaSpringBoot.repository;

import com.example.DiplomskaSpringBoot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
}