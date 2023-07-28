import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Method to check if email exists in the backend
  checkEmailExists(email: string): Observable<any> {
    const url = `${this.apiUrl}/odlagalisca/user/checkEmail`; 
    return this.http.get(url, { params: { email } });
  }

  // Method to register a new user and hash the password before sending to the backend
  registerUser(email: string, password: string): Observable<any> {
    // Here, you should hash the password before sending it to the backend
    // For security reasons, it is recommended to hash the password on the server-side.
    // You can use libraries like bcrypt or any hashing algorithm supported by your backend.

    // For now, we'll just send the plain password to the backend.
    const url = `${this.apiUrl}/odlagalisca/user/register`;
    return this.http.post(url, { email, password });
  }

  // Add other methods for user-related operations here, such as login, etc.
}
