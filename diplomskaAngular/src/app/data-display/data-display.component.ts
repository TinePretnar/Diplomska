import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePopupComponent } from '../image-popup/image-popup.component';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent {
  @Input() markerData: any;
  @Input() isDataDisplayVisible!: boolean;

  // Define the output EventEmitter
  @Output() closeDataDisplayEvent: EventEmitter<void> = new EventEmitter();

  // Method to handle the close button click in DataDisplayComponent
  closeDataDisplay() {
    this.closeDataDisplayEvent.emit();
  }

  constructor(private dialog: MatDialog) {}

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
}
