package com.example.DiplomskaSpringBoot;
import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.repository.OdlagaliscaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OdlagaliscaService {

    private final OdlagaliscaRepository odlagaliscaRepository;

    @Autowired
    public OdlagaliscaService(OdlagaliscaRepository odlagaliscaRepository) {
        this.odlagaliscaRepository = odlagaliscaRepository;
    }

    public List<Odlagalisca> getAllOdlagalisca() {
        return odlagaliscaRepository.findAll();
    }

    // Add more methods for additional business logic if needed
}