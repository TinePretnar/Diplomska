package com.example.DiplomskaSpringBoot.repository;
import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OdlagaliscaRepository extends JpaRepository<Odlagalisca, Long> {
    // Add custom query methods if needed
}
