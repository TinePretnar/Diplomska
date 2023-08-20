import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instructions-popup',
  templateUrl: './instructions-popup.component.html',
  styleUrls: ['./instructions-popup.component.css']
})
export class InstructionsPopupComponent {

constructor(public dialogRef: MatDialogRef<InstructionsPopupComponent>) {}

closePopup(): void {
  this.dialogRef.close();
}

}
