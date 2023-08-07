import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imagePath: string },
    private dialogRef: MatDialogRef<ImagePopupComponent>
  ) {}

  closeImagePopup(): void {
    this.dialogRef.close();
  }
}
