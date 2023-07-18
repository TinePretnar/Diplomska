package com.example.DiplomskaSpringBoot.service;

import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.repository.OdlagaliscaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OdlagaliscaService {

    private final OdlagaliscaRepository odlagaliscaRepository;

    public OdlagaliscaService(OdlagaliscaRepository odlagaliscaRepository) {
        this.odlagaliscaRepository = odlagaliscaRepository;
    }

    public List<Odlagalisca> getOdlagalisca() {
        return odlagaliscaRepository.findAll();
    }
}