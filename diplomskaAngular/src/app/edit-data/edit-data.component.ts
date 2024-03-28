import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component'; 

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit, OnChanges {

  // Define properties to edit odlagališče
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
  selectedImages: File[] = [];
  imagePreviews: SafeUrl[] = [];
  nepotrjen: boolean = false;
  ocisceno: boolean = false;

  // Declare the markerData property as an @Input
  @Input() markerData: any;

  // Define the output EventEmitter to emit events when data is added or the dialog is closed
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  @Output() cancelEditEvent: EventEmitter<void> = new EventEmitter();

  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private dialog: MatDialog, private mapComponent: MapComponent) {}

  ngOnInit() {
    this.naziv = this.markerData.odlagalisce.naziv;
    this.ocisceno = this.markerData.odlagalisce.ocisceno
    this.dostop = this.markerData.odlagalisce.dostop;
    this.oddaljenostOdCeste = this.markerData.odlagalisce.oddaljenostOdCeste;
    this.lega = this.markerData.odlagalisce.lega;
    this.povrsina = this.markerData.odlagalisce.povrsina;
    this.prostornina = this.markerData.odlagalisce.prostornina;
    this.organskiOdpadki = this.markerData.odlagalisce.organskiOdpadki;
    this.gradbeniOdpadki = this.markerData.odlagalisce.gradbeniOdpadki;
    this.komunalniOdpadki = this.markerData.odlagalisce.komunalniOdpadki;
    this.kosovniOdpadki = this.markerData.odlagalisce.kosovniOdpadki;
    this.pnevmatike = this.markerData.odlagalisce.pnevmatike;
    this.motornaVozila = this.markerData.odlagalisce.motornaVozila;
    this.salonitnePlosce = this.markerData.odlagalisce.salonitnePlosce;
    this.nevarniOdpadki = this.markerData.odlagalisce.nevarniOdpadki;
    this.nevarnaTekocina = this.markerData.odlagalisce.nevarnaNeznanaTekocina;
    this.opisNevarnihOdpadkov = this.markerData.odlagalisce.opisNevarnihOdpadkov;
    this.odpadkiZakopani = this.markerData.odlagalisce.odpadkiZakopani;
    this.opombe = this.markerData.odlagalisce.opombe;
    this.obcina = this.markerData.odlagalisce.obcina;
    this.ocenaPomembnosti = this.markerData.odlagalisce.ocenaPomembnosti;
    this.clickedCoordinates = this.markerData.odlagalisce.clickedCoordinates;
    this.nepotrjen = this.markerData.odlagalisce.nepotrjen;
    console.log(this.markerData)
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if the markerData input property has changed
    if (changes['markerData'] && changes['markerData'].currentValue) {
      // Access the updated coordinates from markerData and display them
      this.clickedCoordinates = changes['markerData'].currentValue.coordinates;
    }
  }

  onImageSelected(event: any): void {
    // Get the selected image files (files property is an array-like object)
    this.selectedImages = Array.from(event.target.files);

    // Preprocess the images and store SafeUrl objects in imagePreviews
    this.imagePreviews = this.selectedImages.map(image => this.getImageUrl(image));
  }

  // Method to remove the selected image at the specified index
  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imagePreviews.splice(index, 1); // Remove the corresponding base64-encoded string
  }

  // Updated method to get the URL of the selected image for preview (using DomSanitizer)
  getImageUrl(image: File): SafeUrl {
    const url = URL.createObjectURL(image);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  // Method to save the new odlagališče
  updateData() {
    const currentDate = new Date();
     // Convert Coordinates to WKT format
     const wktCoordinates = this.markerData.coordinates
     ? `MULTIPOINT ((${this.markerData.coordinates.lng} ${this.markerData.coordinates.lat}))`
     : null;
   
    // Create an object with all the data to edit the odlagalisce
    const formData ={
      updatedOdlagalisce: {
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
        ocisceno: this.ocisceno,
        datumVnosaVRegister: this.markerData.odlagalisce.datumVnosaVRegister, 
        datumZadnjeSpremembe: currentDate,
        nepotrjen: this.nepotrjen,
        picturePaths: this.markerData.odlagalisce.picturePaths
      },
      images: this.selectedImages
    };

    // Call the updateOdlagalisce method in the dataService
    console.log(formData)
    this.dataService.updateOdlagalisce(this.markerData.odlagalisce.id, formData).subscribe(
      (response) => {
        console.log('Odlagališče updated successfully:', response);
        // Emit the dataAdded event with the updated odlagališče data
        this.dataAdded.emit(response);
        // Close the dialog after data is updated
        this.cancel();
      },
      (error) => {
        console.error('Error updating odlagališče:', error);
        this.cancel();
      }
    );
  }

  // Method to cancel and close the dialog
  cancel() {
    this.mapComponent.refreshMapDisplay();
    // Emit the closeDialog event to notify the parent component to close the dialog
    this.cancelEditEvent.emit();
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

  openImagePopup(imagePath: string): void {
    // Open the image popup using the Angular Material Dialog and pass data
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: { imagePath },
    });
  
    // Subscribe to the afterClosed event to handle actions after the dialog is closed (optional)
    dialogRef.afterClosed().subscribe(() => {
      console.log('Image popup closed');
    });
  }
  removePicturePath(picturePath: string): void {
    // Remove the picturePath from markerData
    const index = this.markerData.odlagalisce.picturePaths.indexOf(picturePath);
    if (index !== -1) {
      this.markerData.odlagalisce.picturePaths.splice(index, 1);
    }
  }
}

