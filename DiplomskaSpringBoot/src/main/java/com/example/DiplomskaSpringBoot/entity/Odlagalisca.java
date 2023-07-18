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
    // Parameterized constructor
    public Odlagalisca(int id, boolean ocisceno, String naziv, String dostop, String oddaljenostOdCesteVMetrih,
                       String lega, String povrsina, String prostornina, String organskiOdpadki, String gradbeniOdpadki,
                       String komunalniOdpadki, String kosovniOdpadki, String pnevmatike, String motornaVozila,
                       String salonitnePlosce, String nevarniOdpadki, boolean nevarnaNeznanaTekocina, String opisNevarnihOdpadkov,
                       boolean odpadkiZakopani, String opombe, String obcina, String datumVnosaVRegister,
                       String datumZadnjeSpremembe, String ocenaPomembnosti, String statRegija, String geometry) {
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
        this.statRegija = statRegija;
        this.geometry = geometry;
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

    public String getOddaljenostOdCesteVMetrih() {
        return oddaljenostOdCesteVMetrih;
    }

    public void setOddaljenostOdCesteVMetrih(String oddaljenostOdCesteVMetrih) {
        this.oddaljenostOdCesteVMetrih = oddaljenostOdCesteVMetrih;
    }

    public String getLega() {
        return lega;
    }

    public void setLega(String lega) {
        this.lega = lega;
    }

    public String getPovrsina() {
        return povrsina;
    }

    public void setPovrsina(String povrsina) {
        this.povrsina = povrsina;
    }

    public String getProstornina() {
        return prostornina;
    }

    public void setProstornina(String prostornina) {
        this.prostornina = prostornina;
    }

    public String getOrganskiOdpadki() {
        return organskiOdpadki;
    }

    public void setOrganskiOdpadki(String organskiOdpadki) {
        this.organskiOdpadki = organskiOdpadki;
    }

    public String getGradbeniOdpadki() {
        return gradbeniOdpadki;
    }

    public void setGradbeniOdpadki(String gradbeniOdpadki) {
        this.gradbeniOdpadki = gradbeniOdpadki;
    }

    public String getKomunalniOdpadki() {
        return komunalniOdpadki;
    }

    public void setKomunalniOdpadki(String komunalniOdpadki) {
        this.komunalniOdpadki = komunalniOdpadki;
    }

    public String getKosovniOdpadki() {
        return kosovniOdpadki;
    }

    public void setKosovniOdpadki(String kosovniOdpadki) {
        this.kosovniOdpadki = kosovniOdpadki;
    }

    public String getPnevmatike() {
        return pnevmatike;
    }

    public void setPnevmatike(String pnevmatike) {
        this.pnevmatike = pnevmatike;
    }

    public String getMotornaVozila() {
        return motornaVozila;
    }

    public void setMotornaVozila(String motornaVozila) {
        this.motornaVozila = motornaVozila;
    }

    public String getSalonitnePlosce() {
        return salonitnePlosce;
    }

    public void setSalonitnePlosce(String salonitnePlosce) {
        this.salonitnePlosce = salonitnePlosce;
    }

    public String getNevarniOdpadki() {
        return nevarniOdpadki;
    }

    public void setNevarniOdpadki(String nevarniOdpadki) {
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

    public String getDatumVnosaVRegister() {
        return datumVnosaVRegister;
    }

    public void setDatumVnosaVRegister(String datumVnosaVRegister) {
        this.datumVnosaVRegister = datumVnosaVRegister;
    }

    public String getDatumZadnjeSpremembe() {
        return datumZadnjeSpremembe;
    }

    public void setDatumZadnjeSpremembe(String datumZadnjeSpremembe) {
        this.datumZadnjeSpremembe = datumZadnjeSpremembe;
    }

    public String getOcenaPomembnosti() {
        return ocenaPomembnosti;
    }

    public void setOcenaPomembnosti(String ocenaPomembnosti) {
        this.ocenaPomembnosti = ocenaPomembnosti;
    }

    public String getStatRegija() {
        return statRegija;
    }

    public void setStatRegija(String statRegija) {
        this.statRegija = statRegija;
    }

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
    }
}