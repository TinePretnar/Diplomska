import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, NgZone } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service'; // Import the UserService
import { AddDataComponent } from '../add-data/add-data.component';

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
  isDataDisplayVisibleAddMarker = false;


  user: any; // Store the authenticated user information

  clickedCoordinates: { lat: number; lng: number } | null = null; // Store the clicked coordinates
  newMarker: google.maps.Marker | null = null; // Store the new marker
  markerAddOdlagalisce: google.maps.Marker | null = null; // Declare markerAddOdlagalisce as a class member

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    public userService: UserService, // Inject the UserService
    private ngZone: NgZone // Inject NgZone
  ) {}

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
    this.mapClickListener();
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
  
      // Skip markers with coordinates (0,0)
      if (coordinates.lat === 0 && coordinates.lng === 0) {
        continue;
      }
  
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

    openRegistrationDialog(): void {
      const dialogRef = this.dialog.open(RegistrationComponent, {
        width: '500px',
        disableClose: true,
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle any actions after the dialog is closed, if needed
        console.log('Registration dialog closed:', result);
      });
    }
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        disableClose: true,
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle any actions after the dialog is closed, if needed
        console.log('Login dialog closed:', result);
      });
    }

    logout(): void {
      // Call the UserService to log the user out
      this.userService.logout();
      // ... (any other actions you want to perform on logout)
    }

    onAddMarker(): void {
      this.isDataDisplayVisibleAddMarker = true;
      console.log('isDataDisplayVisibleAddMarker:', this.isDataDisplayVisibleAddMarker); // Add this log
      this.isDataDisplayVisible = false;
      // Pass the clickedCoordinates to markerData input
    }
    @Output() markerDataChange: EventEmitter<any> = new EventEmitter<any>();
    mapClickListener(): void {
      // Store the marker instance
      let markerAddOdlagalisce: google.maps.Marker | null = null;
      
      // Make the map clickable and listen for click events
      this.map.addListener('click', (event: any) => {
        if (this.isDataDisplayVisibleAddMarker) {
          // Get the clicked coordinates
          const clickedCoordinates = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
      
          // Pass the clickedCoordinates to markerData input
          this.selectedMarkerData = {
            coordinates: clickedCoordinates,
          };
      
          // Emit the updated markerData
          this.markerDataChange.emit(this.selectedMarkerData);
      
          if (markerAddOdlagalisce) {
            // If a marker already exists, remove it from the map
            markerAddOdlagalisce.setMap(null);
          }
      
          // Create a new marker at the clicked coordinates
          markerAddOdlagalisce = new google.maps.Marker({
            position: clickedCoordinates,
            map: this.map,
          });
        } else {
          // If isDataDisplayVisibleAddMarker is false, remove the marker from the map
          if (markerAddOdlagalisce) {
            markerAddOdlagalisce.setMap(null);
            markerAddOdlagalisce = null; // Set markerAddOdlagalisce to null to indicate there's no marker on the map
          }
        }
      });
    }
    
    updateMarkerData(data: any) {
      this.selectedMarkerData = data;
    }
    
    
    onDataAdded() {
      // Implement any logic to handle the new odlagališče data here
      // For example, you can call the API to save the new odlagališče data
    
      // Close the AddDataComponent dialog after data is added
      this.isDataDisplayVisibleAddMarker = false;
      this.ngZone.runOutsideAngular(() => {
        google.maps.event.trigger(this.map, 'click', {
          latLng: new google.maps.LatLng(this.selectedMarkerData.coordinates.lat, this.selectedMarkerData.coordinates.lng)
        });
      });
    }
    
    onAddDataClose() {
      // Implement any logic if needed
      // For example, reset any form fields or perform any cleanup
    
      // Close the AddDataComponent dialog without adding data
      this.isDataDisplayVisibleAddMarker = false;
      
      // Check if selectedMarkerData and its coordinates exist
      if (this.selectedMarkerData && this.selectedMarkerData.coordinates) {
        // Trigger a virtual click on the map to update the marker's visibility
        this.ngZone.runOutsideAngular(() => {
          google.maps.event.trigger(this.map, 'click', {
            latLng: new google.maps.LatLng(this.selectedMarkerData.coordinates.lat, this.selectedMarkerData.coordinates.lng)
          });
        });
      }
    }
}
    
  
    
