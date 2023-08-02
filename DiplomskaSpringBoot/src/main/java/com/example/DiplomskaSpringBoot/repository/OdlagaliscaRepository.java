package com.example.DiplomskaSpringBoot.repository;

import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Timestamp;

@Repository
public interface OdlagaliscaRepository extends JpaRepository<Odlagalisca, Integer> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO dataodlagalisca.registerdivjihodlagalisc " +
            "(naziv, geometry, dostop, \"oddaljenost od ceste [m]\", lega, \"površina [m2]\", " +
            "prostornina, \"organski odpadki %\", \"gradbeni odpadki %\", \"komunalni odpadki %\", " +
            "\"kosovni odpadki %\", \"pnevmatike %\", \"motorna vozila %\", \"salonitne plošče %\", " +
            "\"nevarni odpadki %\", \"sodi z nevarno/neznano tekočino\", " +
            "\"opis in količina nevarnih odpadkov\", \"velik del odpadkov je zakopanih?\", " +
            "opombe, občina, \"ocena pomembnosti\", očiščeno, \"datum vnosa v register\", " +
            "\"datum zadnje spremembe\", nepotrjen) " +
            "VALUES (:naziv, public.ST_GeomFromText(:geometry), :dostop, :oddaljenostOdCesteVMetrih, :lega, :povrsina, :prostornina, " +
            ":organskiOdpadki, :gradbeniOdpadki, :komunalniOdpadki, :kosovniOdpadki, :pnevmatike, :motornaVozila, " +
            ":salonitnePlosce, :nevarniOdpadki, :nevarnaNeznanaTekocina, :opisNevarnihOdpadkov, :odpadkiZakopani, " +
            ":opombe, :obcina, :ocenaPomembnosti, :ocisceno, :datumVnosaVRegister, :datumZadnjeSpremembe, :nepotrjen)",
            nativeQuery = true)

    void insertOdlagalisca(
            @Param("naziv") String naziv,
            @Param("geometry") String geometry,
            @Param("dostop") String dostop,
            @Param("oddaljenostOdCesteVMetrih") Double oddaljenostOdCesteVMetrih,
            @Param("lega") String lega,
            @Param("povrsina") Double povrsina,
            @Param("prostornina") String prostornina,
            @Param("organskiOdpadki") Double organskiOdpadki,
            @Param("gradbeniOdpadki") Double gradbeniOdpadki,
            @Param("komunalniOdpadki") Double komunalniOdpadki,
            @Param("kosovniOdpadki") Double kosovniOdpadki,
            @Param("pnevmatike") Double pnevmatike,
            @Param("motornaVozila") Double motornaVozila,
            @Param("salonitnePlosce") Double salonitnePlosce,
            @Param("nevarniOdpadki") Double nevarniOdpadki,
            @Param("nevarnaNeznanaTekocina") boolean nevarnaNeznanaTekocina,
            @Param("opisNevarnihOdpadkov") String opisNevarnihOdpadkov,
            @Param("odpadkiZakopani") boolean odpadkiZakopani,
            @Param("opombe") String opombe,
            @Param("obcina") String obcina,
            @Param("ocenaPomembnosti") Double ocenaPomembnosti,
            @Param("ocisceno") boolean ocisceno,
            @Param("datumVnosaVRegister") Timestamp datumVnosaVRegister,
            @Param("datumZadnjeSpremembe") Timestamp datumZadnjeSpremembe,
            @Param("nepotrjen") boolean nepotrjen
    );
}

