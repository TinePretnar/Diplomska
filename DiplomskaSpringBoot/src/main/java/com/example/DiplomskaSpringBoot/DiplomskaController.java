package com.example.DiplomskaSpringBoot;
import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.repository.OdlagaliscaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/odlagalisca")
public class DiplomskaController {

    private final OdlagaliscaRepository odlagaliscaRepository;

    @Autowired
    public DiplomskaController(OdlagaliscaRepository odlagaliscaRepository) {
        this.odlagaliscaRepository = odlagaliscaRepository;
    }

    @GetMapping
    public List<Odlagalisca> getAllOdlagalisca() {
        return odlagaliscaRepository.findAll();
    }
}