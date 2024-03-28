import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  
  getOdlagalisca(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/odlagalisca`);
  }

  addOdlagalisce(formData: any): Observable<any> {
    // Create a new FormData object
    const formDataObj = new FormData();
  
    // Append the JSON data as a Blob with 'application/json' content type
    const jsonDataBlob = new Blob([JSON.stringify(formData.newOdlagalisce)], { type: 'application/json' });
    formDataObj.append('newOdlagalisce', jsonDataBlob);
  
    // Always append an empty array for the "images" parameter
    formDataObj.append('images', JSON.stringify([]));
  
    // Append each image as a separate part in the FormData
    for (const image of formData.images) {
      formDataObj.append('images', image, image.name);
    }
  
    return this.http.post<any>(`${this.baseUrl}/odlagalisca/add`, formDataObj);
  }
  
  
  deleteOdlagalisce(markerId: number): Observable<any> {
    console.log(markerId)
    return this.http.delete<any>(`${this.baseUrl}/odlagalisca/delete/${markerId}`);
  }

  updateOdlagalisce(odlagalisceId: number, formData: any): Observable<any> {
    // Create a new FormData object
    const formDataObj = new FormData();

    // Append the JSON data as a Blob with 'application/json' content type
    const jsonDataBlob = new Blob([JSON.stringify(formData.updatedOdlagalisce)], { type: 'application/json' });
    formDataObj.append('updatedOdlagalisce', jsonDataBlob);

    // Always append an empty array for the "images" parameter
    formDataObj.append('images', JSON.stringify([]));

    // Append each image as a separate part in the FormData
    for (const image of formData.images) {
      formDataObj.append('images', image, image.name);
    }

    return this.http.put<any>(`${this.baseUrl}/odlagalisca/update/${odlagalisceId}`, formDataObj);
  }
  
}
