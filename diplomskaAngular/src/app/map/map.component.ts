import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: any;
  map: any;
  apiKey = 'YAIzaSyDneQmiGalDt-h8nrJEyGNqX7FBNyPxSpc';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fetchOdlagalisca();
    this.loadMap();
  }

  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(46.118320, 14.757101),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  fetchOdlagalisca(): void {
    this.dataService.getOdlagalisca().subscribe(
      data => {
        console.log(data); // Print the received data in the browser console
        // Store the data in a variable if needed
      },
      error => {
        console.log(error); // Handle error if any
      }
    );
  }
}
