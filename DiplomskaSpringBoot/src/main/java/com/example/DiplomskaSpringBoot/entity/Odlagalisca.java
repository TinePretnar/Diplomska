package com.example.DiplomskaSpringBoot.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "registerdivjihodlagalisc")
public class Odlagalisca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id_")
    private int id;

    @Column(name = "očiščeno")
    private boolean ocisceno;

    @Column(name = "naziv")
    private String naziv;

    @Column(name = "dostop")
    private String dostop;

    @Column(name = "oddaljenost od ceste [m]")
    private int oddaljenostOdCesteVMetrih;

    @Column(name = "lega")
    private String lega;

    @Column(name = "površina [m2]")
    private int povrsina;

    @Column(name = "prostornina")
    private String prostornina;

    @Column(name = "organski odpadki %")
    private int organskiOdpadki;

    @Column(name = "gradbeni odpadki %")
    private int gradbeniOdpadki;

    @Column(name = "komunalni odpadki %")
    private int komunalniOdpadki;

    @Column(name = "kosovni odpadki %")
    private int kosovniOdpadki;

    @Column(name = "pnevmatike %")
    private int pnevmatike;

    @Column(name = "motorna vozila %")
    private int motornaVozila;

    @Column(name = "salonitne plošče %")
    private int salonitnePlosce;

    @Column(name = "nevarni odpadki %")
    private int nevarniOdpadki;

    @Column(name = "sodi z nevarno/neznano tekočino")
    private boolean nevarnaNeznanaTekocina;

    @Column(name = "opis in količina nevarnih odpadkov")
    private String opisNevarnihOdpadkov;

    @Column(name = "velik del odpadkov je zakopanih?")
    private boolean odpadkiZakopani;

    @Column(name = "opombe")
    private String opombe;

    @Column(name = "občina")
    private String obcina;

    @Column(name = "datum vnosa v register")
    private String datumVnosaVRegister;

    @Column(name = "datum zadnje spremembe")
    private String datumZadnjeSpremembe;

    @Column(name = "ocena pomembnosti")
    private int ocenaPomembnosti;

    @Column(name = "statistična regija")
    private int statRegija;

    @Column(name = "geometry")
    private String geometry;

    // Default constructor (required by JPA)
    public Odlagalisca() {
    }

    // Getters and setters for the attributes

    // ...
}
