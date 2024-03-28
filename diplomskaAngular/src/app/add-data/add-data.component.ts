import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  selectedImages: File[] = [];
  imagePreviews: SafeUrl[] = [];
  coordinatesNull: boolean = false;

  // Declare the markerData property as an @Input
  @Input() markerData: any;

  // Define the output EventEmitter to emit events when data is added or the dialog is closed
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
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


    // Add this method in your component
  getBase64Image(image: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      // The reader.result contains the base64-encoded image data
      // You can use it as the src attribute for the img tag
      // This will not cause the ExpressionChangedAfterItHasBeenCheckedError
      return reader.result as string;
    };
    return ''; // Default empty string
  }


  // Method to save the new odlagališče
  saveData() {
    const currentDate = new Date();

    // Check if clickedCoordinates is null or undefined
    if (!this.clickedCoordinates) {
      console.error('No coordinates selected.');
      this.coordinatesNull = true;
      return;
    }

     // Convert clickedCoordinates to WKT format
     const wktCoordinates = this.clickedCoordinates
     ? `MULTIPOINT ((${this.clickedCoordinates.lng} ${this.clickedCoordinates.lat}))`
     : null;
   
    // Create an object with all the data needed for the new odlagališče
    const formData ={
      newOdlagalisce: {
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
        picturePaths: null
      },
      images: this.selectedImages
    };

    // Emit the dataAdded event with the new odlagališče data
    this.dataService.addOdlagalisce(formData).subscribe(
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

