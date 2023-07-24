import { Component, Input, Output, EventEmitter } from '@angular/core';

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
}
