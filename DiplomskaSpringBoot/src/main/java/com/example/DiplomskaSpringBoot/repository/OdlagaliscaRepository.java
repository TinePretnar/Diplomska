package com.example.DiplomskaSpringBoot.repository;
import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OdlagaliscaRepository extends JpaRepository<Odlagalisca, Long> {
    @Query(value = "SELECT * FROM registerdivjihodlagalisc", nativeQuery = true)
    List<Odlagalisca> VsaOdlagalisca();
}
