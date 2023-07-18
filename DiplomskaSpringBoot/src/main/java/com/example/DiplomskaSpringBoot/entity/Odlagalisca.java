package com.example.DiplomskaSpringBoot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "registerdivjihodlagalisc")
public class Odlagalisca {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id_")
    private int id;

    @Column(name = "očiščeno")
    private boolean ocisceno;

    @Column(name = "naziv")
    private String naziv;

    @Column(name = "dostop")
    private String dostop;

    @Column(name = "oddaljenost od ceste [m]")
    private String oddaljenostOdCesteVMetrih;

    @Column(name = "lega")
    private String lega;

    @Column(name = "površina [m2]")
    private String povrsina;

    @Column(name = "prostornina")
    private String prostornina;

    @Column(name = "organski odpadki %")
    private String organskiOdpadki;

    @Column(name = "gradbeni odpadki %")
    private String gradbeniOdpadki;

    @Column(name = "komunalni odpadki %")
    private String komunalniOdpadki;

    @Column(name = "kosovni odpadki %")
    private String kosovniOdpadki;

    @Column(name = "pnevmatike %")
    private String pnevmatike;

    @Column(name = "motorna vozila %")
    private String motornaVozila;

    @Column(name = "salonitne plošče %")
    private String salonitnePlosce;

    @Column(name = "nevarni odpadki %")
    private String nevarniOdpadki;

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
    private String ocenaPomembnosti;

    @Column(name = "statistična regija")
    private String statRegija;

    @Column(name = "geometry")
    private String geometry;

    // Default constructor (required by JPA)
    protected Odlagalisca() {
    }

    // Constructor with all attributes
    public Odlagalisca(boolean ocisceno, String naziv, String dostop, String oddaljenostOdCesteVMetrih, String lega, String povrsina, String prostornina, String organskiOdpadki, String gradbeniOdpadki, String komunalniOdpadki, String kosovniOdpadki, String pnevmatike, String motornaVozila, String salonitnePlosce, String nevarniOdpadki, boolean nevarnaNeznanaTekocina, String opisNevarnihOdpadkov, boolean odpadkiZakopani, String opombe, String obcina, String datumVnosaVRegister, String datumZadnjeSpremembe, String ocenaPomembnosti, String statRegija, String geometry) {
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
        this.statRegija = statRegija;
        this.geometry = geometry;
    }

    // Constructor with all attributes

   /* public void setId(int id) {
        this.id = id;
    }

    public void setOcisceno(boolean ocisceno) {
        this.ocisceno = ocisceno;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public void setDostop(String dostop) {
        this.dostop = dostop;
    }

    public void setOddaljenostOdCesteVMetrih(String oddaljenostOdCesteVMetrih) {
        this.oddaljenostOdCesteVMetrih = oddaljenostOdCesteVMetrih;
    }

    public void setLega(String lega) {
        this.lega = lega;
    }

    public void setPovrsina(String povrsina) {
        this.povrsina = povrsina;
    }

    public void setProstornina(String prostornina) {
        this.prostornina = prostornina;
    }

    public void setOrganskiOdpadki(String organskiOdpadki) {
        this.organskiOdpadki = organskiOdpadki;
    }

    public void setGradbeniOdpadki(String gradbeniOdpadki) {
        this.gradbeniOdpadki = gradbeniOdpadki;
    }

    public void setKomunalniOdpadki(String komunalniOdpadki) {
        this.komunalniOdpadki = komunalniOdpadki;
    }

    public void setKosovniOdpadki(String kosovniOdpadki) {
        this.kosovniOdpadki = kosovniOdpadki;
    }

    public void setPnevmatike(String pnevmatike) {
        this.pnevmatike = pnevmatike;
    }

    public void setMotornaVozila(String motornaVozila) {
        this.motornaVozila = motornaVozila;
    }

    public void setSalonitnePlosce(String salonitnePlosce) {
        this.salonitnePlosce = salonitnePlosce;
    }

    public void setNevarniOdpadki(String nevarniOdpadki) {
        this.nevarniOdpadki = nevarniOdpadki;
    }

    public void setNevarnaNeznanaTekocina(boolean nevarnaNeznanaTekocina) {
        this.nevarnaNeznanaTekocina = nevarnaNeznanaTekocina;
    }

    public void setOpisNevarnihOdpadkov(String opisNevarnihOdpadkov) {
        this.opisNevarnihOdpadkov = opisNevarnihOdpadkov;
    }

    public void setOdpadkiZakopani(boolean odpadkiZakopani) {
        this.odpadkiZakopani = odpadkiZakopani;
    }

    public void setOpombe(String opombe) {
        this.opombe = opombe;
    }

    public void setObcina(String obcina) {
        this.obcina = obcina;
    }

    public void setDatumVnosaVRegister(String datumVnosaVRegister) {
        this.datumVnosaVRegister = datumVnosaVRegister;
    }

    public void setDatumZadnjeSpremembe(String datumZadnjeSpremembe) {
        this.datumZadnjeSpremembe = datumZadnjeSpremembe;
    }

    public void setOcenaPomembnosti(String ocenaPomembnosti) {
        this.ocenaPomembnosti = ocenaPomembnosti;
    }


    public void setstatRegija(String statRegija) {
        this.statRegija = statRegija;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;

    }*/
}