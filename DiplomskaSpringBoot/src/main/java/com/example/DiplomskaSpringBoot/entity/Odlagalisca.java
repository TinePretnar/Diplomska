package com.example.DiplomskaSpringBoot.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

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
    private Double oddaljenostOdCesteVMetrih;

    @Column(name = "lega")
    private String lega;

    @Column(name = "površina [m2]")
    private Double povrsina;

    @Column(name = "prostornina")
    private String prostornina;

    @Column(name = "organski odpadki %")
    private Double organskiOdpadki;

    @Column(name = "gradbeni odpadki %")
    private Double gradbeniOdpadki;

    @Column(name = "komunalni odpadki %")
    private Double komunalniOdpadki;

    @Column(name = "kosovni odpadki %")
    private Double kosovniOdpadki;

    @Column(name = "pnevmatike %")
    private Double pnevmatike;

    @Column(name = "motorna vozila %")
    private Double motornaVozila;

    @Column(name = "salonitne plošče %")
    private Double salonitnePlosce;

    @Column(name = "nevarni odpadki %")
    private Double nevarniOdpadki;

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
    private Timestamp datumVnosaVRegister;

    @Column(name = "datum zadnje spremembe")
    private Timestamp datumZadnjeSpremembe;

    @Column(name = "ocena pomembnosti")
    private Double ocenaPomembnosti;

    @Column(name = "nepotrjen")
    private boolean nepotrjen;

    @Column(name = "geometry")
    private String geometry;

    // Default constructor (required by JPA)
    protected Odlagalisca() {
    }
    // Parameterized constructor
    public Odlagalisca(int id, boolean ocisceno, String naziv, String dostop, Double oddaljenostOdCesteVMetrih,
                       String lega, Double povrsina, String prostornina, Double organskiOdpadki, Double gradbeniOdpadki,
                       Double komunalniOdpadki, Double kosovniOdpadki, Double pnevmatike, Double motornaVozila,
                       Double salonitnePlosce, Double nevarniOdpadki, boolean nevarnaNeznanaTekocina, String opisNevarnihOdpadkov,
                       boolean odpadkiZakopani, String opombe, String obcina, Timestamp datumVnosaVRegister,
                       Timestamp datumZadnjeSpremembe, Double ocenaPomembnosti, String geometry, boolean nepotrjen) {
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
        this.nepotrjen = nepotrjen;
    }

    // Getters and Setters for all attributes
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isOcisceno() {
        return ocisceno;
    }

    public void setOcisceno(boolean ocisceno) {
        this.ocisceno = ocisceno;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getDostop() {
        return dostop;
    }

    public void setDostop(String dostop) {
        this.dostop = dostop;
    }

    public Double getOddaljenostOdCesteVMetrih() {
        return oddaljenostOdCesteVMetrih;
    }

    public void setOddaljenostOdCesteVMetrih(Double oddaljenostOdCesteVMetrih) {
        this.oddaljenostOdCesteVMetrih = oddaljenostOdCesteVMetrih;
    }

    public String getLega() {
        return lega;
    }

    public void setLega(String lega) {
        this.lega = lega;
    }

    public Double getPovrsina() {
        return povrsina;
    }

    public void setPovrsina(Double povrsina) {
        this.povrsina = povrsina;
    }

    public String getProstornina() {
        return prostornina;
    }

    public void setProstornina(String prostornina) {
        this.prostornina = prostornina;
    }

    public Double getOrganskiOdpadki() {
        return organskiOdpadki;
    }

    public void setOrganskiOdpadki(Double organskiOdpadki) {
        this.organskiOdpadki = organskiOdpadki;
    }

    public Double getGradbeniOdpadki() {
        return gradbeniOdpadki;
    }

    public void setGradbeniOdpadki(Double gradbeniOdpadki) {
        this.gradbeniOdpadki = gradbeniOdpadki;
    }

    public Double getKomunalniOdpadki() {
        return komunalniOdpadki;
    }

    public void setKomunalniOdpadki(Double komunalniOdpadki) {
        this.komunalniOdpadki = komunalniOdpadki;
    }

    public Double getKosovniOdpadki() {
        return kosovniOdpadki;
    }

    public void setKosovniOdpadki(Double kosovniOdpadki) {
        this.kosovniOdpadki = kosovniOdpadki;
    }

    public Double getPnevmatike() {
        return pnevmatike;
    }

    public void setPnevmatike(Double pnevmatike) {
        this.pnevmatike = pnevmatike;
    }

    public Double getMotornaVozila() {
        return motornaVozila;
    }

    public void setMotornaVozila(Double motornaVozila) {
        this.motornaVozila = motornaVozila;
    }

    public Double getSalonitnePlosce() {
        return salonitnePlosce;
    }

    public void setSalonitnePlosce(Double salonitnePlosce) {
        this.salonitnePlosce = salonitnePlosce;
    }

    public Double getNevarniOdpadki() {
        return nevarniOdpadki;
    }

    public void setNevarniOdpadki(Double nevarniOdpadki) {
        this.nevarniOdpadki = nevarniOdpadki;
    }

    public boolean isNevarnaNeznanaTekocina() {
        return nevarnaNeznanaTekocina;
    }

    public void setNevarnaNeznanaTekocina(boolean nevarnaNeznanaTekocina) {
        this.nevarnaNeznanaTekocina = nevarnaNeznanaTekocina;
    }

    public String getOpisNevarnihOdpadkov() {
        return opisNevarnihOdpadkov;
    }

    public void setOpisNevarnihOdpadkov(String opisNevarnihOdpadkov) {
        this.opisNevarnihOdpadkov = opisNevarnihOdpadkov;
    }

    public boolean isOdpadkiZakopani() {
        return odpadkiZakopani;
    }

    public void setOdpadkiZakopani(boolean odpadkiZakopani) {
        this.odpadkiZakopani = odpadkiZakopani;
    }

    public String getOpombe() {
        return opombe;
    }

    public void setOpombe(String opombe) {
        this.opombe = opombe;
    }

    public String getObcina() {
        return obcina;
    }

    public void setObcina(String obcina) {
        this.obcina = obcina;
    }

    public Timestamp getDatumVnosaVRegister() {
        return datumVnosaVRegister;
    }

    public void setDatumVnosaVRegister(Timestamp datumVnosaVRegister) {
        this.datumVnosaVRegister = datumVnosaVRegister;
    }

    public Timestamp getDatumZadnjeSpremembe() {
        return datumZadnjeSpremembe;
    }

    public void setDatumZadnjeSpremembe(Timestamp datumZadnjeSpremembe) {
        this.datumZadnjeSpremembe = datumZadnjeSpremembe;
    }

    public Double getOcenaPomembnosti() {
        return ocenaPomembnosti;
    }

    public void setOcenaPomembnosti(Double ocenaPomembnosti) {
        this.ocenaPomembnosti = ocenaPomembnosti;
    }

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
    }

    public boolean isNepotrjen() {
        return nepotrjen;
    }

    public void setNepotrjen(boolean nepotrjen) {
        this.nepotrjen = nepotrjen;
    }

}