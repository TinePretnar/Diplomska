package com.example.DiplomskaSpringBoot.model;

public class Odlagalisce {
    private int id;
    private boolean ocisceno;
    private String naziv;
    private String dostop;
    private int oddaljenostOdCesteVMetrih;
    private String lega;
    private int povrsina;
    private String prostornina;
    private int organskiOdpadki;
    private int gradbeniOdpadki;
    private int komunalniOdpadki;
    private int kosovniOdpadki;
    private int pnevmatike;
    private int motornaVozila;
    private int salonitnePlosce;
    private int nevarniOdpadki;
    private boolean nevarnaNeznanaTekocina;
    private String opisNevarnihOdpadkov;
    private boolean odpadkiZakopani;
    private String opombe;
    private String obcina;
    private String datumVnosaVRegister;
    private String datumZadnjeSpremembe;
    private int ocenaPomembnosti;
    private String geometry;

    public Odlagalisce(int id, boolean ocisceno, String naziv, String dostop, int oddaljenostOdCesteVMetrih, String lega, int povrsina, String prostornina, int organskiOdpadki, int gradbeniOdpadki, int komunalniOdpadki, int kosovniOdpadki, int pnevmatike, int motornaVozila, int salonitnePlosce, int nevarniOdpadki, boolean nevarnaNeznanaTekocina, String opisNevarnihOdpadkov, boolean odpadkiZakopani, String opombe, String obcina, String datumVnosaVRegister, String datumZadnjeSpremembe, int ocenaPomembnosti, String geometry) {
        this.id = id;
        this.ocisceno = ocisceno;
        this.naziv = naziv;
        this.dostop = dostop;
        this.oddaljenostOdCesteVMetrih = oddaljenostOdCesteVMetrih;
        this.lega = lega;
        this.povrsina = povrsina;
        this.prostornina = prostornina;
        this.organskiOdpadki = organskiOdpadki;
        this.gradbeniOdpadki = gradbeniOdpadki;
        this.komunalniOdpadki = komunalniOdpadki;
        this.kosovniOdpadki = kosovniOdpadki;
        this.pnevmatike = pnevmatike;
        this.motornaVozila = motornaVozila;
        this.salonitnePlosce = salonitnePlosce;
        this.nevarniOdpadki = nevarniOdpadki;
        this.nevarnaNeznanaTekocina = nevarnaNeznanaTekocina;
        this.opisNevarnihOdpadkov = opisNevarnihOdpadkov;
        this.odpadkiZakopani = odpadkiZakopani;
        this.opombe = opombe;
        this.obcina = obcina;
        this.datumVnosaVRegister = datumVnosaVRegister;
        this.datumZadnjeSpremembe = datumZadnjeSpremembe;
        this.ocenaPomembnosti = ocenaPomembnosti;
        this.geometry = geometry;
    }

}

