import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { UserService } from '../user.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DataService } from '../data.service';
import { MapComponent } from '../map/map.component'; 



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

  constructor(private dialog: MatDialog, private userService: UserService, private dataService: DataService, private mapComponent: MapComponent) {}

  showEditPanel = false;


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
  
  isAdminUser(): boolean {
    return this.userService.getUserData()?.admin === true;
  }
  editData(): void {
    this.showEditPanel = true;
  }
  
  // Method to handle the cancel event from the EditDataComponent
  cancelEditHandler(): void {
    this.showEditPanel = false;
  }
  
  
  deleteData(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      disableClose: true,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call a function to handle the actual marker deletion
        this.deleteMarker();
      }
    });
  }
  deleteMarker() {
    const markerId = this.markerData.odlagalisce.id;
    const XD = this.dataService.deleteOdlagalisce(markerId);
    this.dataService.deleteOdlagalisce(markerId).subscribe(
      response => {
        // Handle successful deletion (e.g., update UI, refresh data, etc.)
        console.log('Marker deleted successfully', response);
        this.mapComponent.refreshMapDisplay();
        this.closeDataDisplay()
      },
      error => {
        // Handle error
        console.error('Error deleting marker', error);
        this.mapComponent.refreshMapDisplay();
        this.closeDataDisplay()
      }
    );
  }
}
