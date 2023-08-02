import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit, OnChanges {
  // Define properties to capture the data needed for the new odlagališče
  naziv: string | null = null;
  dostop: string | null = null;
  oddaljenostOdCeste: number | null = null;
  lega: string | null = null;
  povrsina: number | null = null;
  prostornina: string | null = null;
  organskiOdpadki: number | null = null;
  gradbeniOdpadki: number | null = null;
  komunalniOdpadki: number | null = null;
  kosovniOdpadki: number | null = null;
  pnevmatike: number | null = null;
  motornaVozila: number | null = null;
  salonitnePlosce: number | null = null;
  nevarniOdpadki: number | null = null;
  nevarnaTekocina: boolean = false;
  opisNevarnihOdpadkov: string | null = null;
  odpadkiZakopani: boolean = false;
  opombe: string | null = null;
  obcina: string | null = null;
  ocenaPomembnosti: number | null = null;
  clickedCoordinates: { lat: number; lng: number } | null = null;

  // Declare the markerData property as an @Input
  @Input() markerData: any;

  // Define the output EventEmitter to emit events when data is added or the dialog is closed
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if the markerData input property has changed
    if (changes['markerData'] && changes['markerData'].currentValue) {
      // Access the updated coordinates from markerData and display them
      this.clickedCoordinates = changes['markerData'].currentValue.coordinates;
    }
  }

  // Method to save the new odlagališče
  saveData() {
    const currentDate = new Date();
     // Convert clickedCoordinates to WKT format
     const wktCoordinates = this.clickedCoordinates
     ? `MULTIPOINT ((${this.clickedCoordinates.lng} ${this.clickedCoordinates.lat}))`
     : null;
   
    // Create an object with all the data needed for the new odlagališče
    const newOdlagalisce = {
      naziv: this.naziv,
      geometry: wktCoordinates,
      dostop: this.dostop,
      oddaljenostOdCesteVMetrih: this.oddaljenostOdCeste,
      lega: this.lega,
      povrsina: this.povrsina,
      prostornina: this.prostornina,
      organskiOdpadki: this.organskiOdpadki,
      gradbeniOdpadki: this.organskiOdpadki,
      komunalniOdpadki: this.komunalniOdpadki,
      kosovniOdpadki: this.kosovniOdpadki,
      pnevmatike: this.pnevmatike,
      motornaVozila: this.motornaVozila,
      salonitnePlosce: this.salonitnePlosce,
      nevarniOdpadki: this.nevarniOdpadki,
      nevarnaNeznanaTekocina: this.nevarnaTekocina,
      opisNevarnihOdpadkov: this.opisNevarnihOdpadkov,
      odpadkiZakopani: this.odpadkiZakopani,
      opombe: this.opombe,
      obcina: this.obcina,
      ocenaPomembnosti: this.ocenaPomembnosti,
      ocisceno: false,
      datumVnosaVRegister: currentDate, 
      datumZadnjeSpremembe: currentDate,
      nepotrjen: true,
    };

    // Emit the dataAdded event with the new odlagališče data
    this.dataService.addOdlagalisce(newOdlagalisce).subscribe(
      (response) => {
        console.log('Odlagališče added successfully:', response);
        // Emit the dataAdded event with the new odlagališče data
        this.dataAdded.emit(response);
        // Close the dialog after data is added
        this.cancel();
      },
      (error) => {
        console.error('Error adding odlagališče:', error);
      }
    );
  }

  // Method to cancel and close the dialog
  cancel() {
    // Emit the closeDialog event to notify the parent component to close the dialog
    this.closeDialog.emit();
  }

  // Method to handle map click events and update the clicked coordinates
  onMapClick(clickedCoordinates: { lat: number; lng: number }) {
    this.clickedCoordinates = clickedCoordinates;
  }

  // Method to convert WKT coordinates to HEX format
  private convertToHex(wktCoordinates: string): string {
    if (!wktCoordinates) {
      return '';
    }
    let hexString = '';
    for (let i = 0; i < wktCoordinates.length; i++) {
      hexString += wktCoordinates.charCodeAt(i).toString(16);
    }
    return hexString.toUpperCase();
  }
}

