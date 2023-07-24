import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter  } from '@angular/core';
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
  markers: any[] = []; // Array to store the markers
  apiKey = 'AIzaSyDneQmiGalDt-h8nrJEyGNqX7FBNyPxSpc';
  showOciscenoTrue = true;
  showOciscenoFalse = true;
  showNevarniOdpadki = true;
  odlagaliscaList: any[] = []; // Array to store the fetched data
  selectedMarkerData: any;
  isDataDisplayVisible = false;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Fetch the data and store it in the odlagaliscaList variable
    this.dataService.getOdlagalisca().subscribe(
      data => {
        console.log(data); // Print the received data in the browser console
        this.odlagaliscaList = data;
        this.displayOdlagalisca(this.odlagaliscaList); // Call the function to display odlagalisca on the map
      },
      error => {
        console.log(error); // Handle error if any
      }
    );
  }

  ngAfterViewInit() {
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
        this.displayOdlagalisca(data); // Call the function to display odlagalisca on the map
      },
      error => {
        console.log(error); // Handle error if any
      }
    );
  }

  displayOdlagalisca(odlagaliscaList: any[]): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  
    for (const odlagalisce of odlagaliscaList) {
      const geometryString = odlagalisce.geometry;
      const coordinates = this.parseGeometryString(geometryString);
      const ocisceno = odlagalisce.ocisceno;
  
      if ((ocisceno && this.showOciscenoTrue) || (!ocisceno && this.showOciscenoFalse)) {
        const marker = this.addMarker(odlagalisce, coordinates);
        this.markers.push(marker);
      }
    }
  }

  parseGeometryString(geometryString: string): { lat: number; lng: number } {
    const regex = /MULTIPOINT \(\(([\d.]+) ([\d.]+)\)\)/;
    const matches = geometryString.match(regex);
    if (matches && matches.length === 3) {
      return { lat: parseFloat(matches[2]), lng: parseFloat(matches[1]) };
    }
    return { lat: 0, lng: 0 }; // Default coordinates if parsing fails
  }

  addMarker(odlagalisce: any, coordinates: { lat: number; lng: number }): any {
    if (odlagalisce.ocisceno) {
      // Use the custom icon for ocisceno == true
      const iconUrl = 'assets/tree-icon.jpg';
      const iconSize = new google.maps.Size(32, 32); // Set the desired size of the icon image
  
      const marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        icon: {
          url: iconUrl,
          scaledSize: iconSize,
        },
      });
  
      // Add a click event listener to the marker
      marker.addListener('click', () => {
        this.onMarkerClick(odlagalisce, coordinates);
      });
  
      return marker;
    } else {
      // For ocisceno == false, omit the icon property to use the default Google Maps icon
      const marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
      });
  
      // Add a click event listener to the marker
      marker.addListener('click', () => {
        this.onMarkerClick(odlagalisce, coordinates);
      });
  
      return marker;
    }
  }
  updateMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  
    for (const odlagalisce of this.odlagaliscaList) {
      const geometryString = odlagalisce.geometry;
      const coordinates = this.parseGeometryString(geometryString);
      const ocisceno = odlagalisce.ocisceno;
      const nevarniOdpadki = odlagalisce.nevarniOdpadki;
  
      if ((ocisceno && this.showOciscenoTrue) ||
          (!ocisceno && nevarniOdpadki === null && this.showOciscenoFalse) ||
          (nevarniOdpadki !== null && !ocisceno && this.showNevarniOdpadki)) {
        const marker = this.addMarker(odlagalisce, coordinates);
        this.markers.push(marker);
      }
    }
  }
  onMarkerClick(odlagalisce: any, coordinates: { lat: number; lng: number }) {
    console.log('Marker Clicked:', odlagalisce, coordinates); // Add this line to log odlagalisce and coordinates to the console
    const markerData = { odlagalisce, coordinates }; // Create an object to hold both odlagalisce and coordinates
    this.selectedMarkerData = markerData;
    this.isDataDisplayVisible = true;
  }

    // Add an EventEmitter property
    closeDataDisplayEvent: EventEmitter<void> = new EventEmitter();
   
    // Method to handle the close button click
   closeDataDisplay() {
    this.isDataDisplayVisible = false;
  }
  
  // Function to toggle the ocisceno true checkbox
  toggleOciscenoTrue(): void {
    this.showOciscenoTrue = !this.showOciscenoTrue;
    this.updateMarkers();
  }

  // Function to toggle the ocisceno false checkbox
  toggleOciscenoFalse(): void {
    this.showOciscenoFalse = !this.showOciscenoFalse;
    this.updateMarkers();
  }
    // Function to toggle the nevarniOdpadki checkbox
    toggleNevarniOdpadki(): void {
      this.showNevarniOdpadki = !this.showNevarniOdpadki;
      this.updateMarkers();
    }
}
