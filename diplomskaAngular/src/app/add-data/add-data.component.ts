import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit, OnChanges {
  // Define properties to capture the data needed for the new odlagališče
  naziv: string | null = null;
  očiščeno: boolean = false;
  dostop: string | null = null;
  oddaljenostOdCeste: number | null = null;
  lega: string | null = null;
  povrsina: number | null = null;
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
  datumVnosaRegister: string | null = null;
  datumZadnjeSpremembe: string | null = null;
  ocenaPomembnosti: number | null = null;
  clickedCoordinates: { lat: number; lng: number } | null = null;

  // Declare the markerData property as an @Input
  @Input() markerData: any;

  // Define the output EventEmitter to emit events when data is added or the dialog is closed
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

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
    // Create an object with all the data needed for the new odlagališče
    const newOdlagalisce = {
      naziv: this.naziv,
      coordinates: this.clickedCoordinates,
      dostop: this.dostop,
      oddaljenostOdCeste: this.oddaljenostOdCeste,
      lega: this.lega,
      povrsina: this.povrsina,
      organskiOdpadki: this.organskiOdpadki,
      gradbeniOdpadki: this.organskiOdpadki,
      komunalniOdpadki: this.komunalniOdpadki,
      kosovniOdpadki: this.kosovniOdpadki,
      pnevmatike: this.pnevmatike,
      motornaVozila: this.motornaVozila,
      salonitnePlosce: this.salonitnePlosce,
      nevarniOdpadki: this.nevarniOdpadki,
      nevarnaTekocina: this.nevarnaTekocina,
      opisNevarnihOdpadkov: this.opisNevarnihOdpadkov,
      odpadkiZakopani: this.odpadkiZakopani,
      opombe: this.opombe,
      obcina: this.obcina,
      ocenaPomembnosti: this.ocenaPomembnosti,
      // Očiščeno, datumVnosaRegister, and datumZadnjeSpremembe will be obtained from other means
    };

    // Emit the dataAdded event with the new odlagališče data
    this.dataAdded.emit(newOdlagalisce);

    // Close the dialog after data is added
    this.cancel();
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
}

