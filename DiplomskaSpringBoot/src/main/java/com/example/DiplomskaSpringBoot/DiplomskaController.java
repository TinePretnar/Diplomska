package com.example.DiplomskaSpringBoot;
import com.example.DiplomskaSpringBoot.entity.Odlagalisca;

import com.example.DiplomskaSpringBoot.service.OdlagaliscaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/odlagalisca")
public class DiplomskaController {

    private final OdlagaliscaService odlagaliscaService;

    public DiplomskaController(OdlagaliscaService odlagaliscaService) {
        this.odlagaliscaService = odlagaliscaService;
    }

    @GetMapping
    public List<Odlagalisca> getOdlagaliscaByNaziv() {
        return odlagaliscaService.getOdlagalisca();
    }

}