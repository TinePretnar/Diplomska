import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit, OnChanges {
  // Define properties to capture the data needed for the new odlagališče
  naziv: string = '';
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
    // Add the logic here to save the data to your backend or perform any other necessary actions
    // For example, you can create an object with the data and emit it through the dataAdded EventEmitter
    const newOdlagalisce = {
      naziv: this.naziv,
      coordinates: this.clickedCoordinates // Add the clicked coordinates to the new odlagališče data
      // Add other properties as needed
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

