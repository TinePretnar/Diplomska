import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';
  private loggedIn = false; // Add a private property to store the login status
  private user: any; // Add a private property to store user data

  constructor(private http: HttpClient) { }

  // Method to check if email exists in the backend
  checkEmailExists(email: string): Observable<any> {
    const url = `${this.apiUrl}/odlagalisca/user/checkEmail`; 
    return this.http.get(url, { params: { email } });
  }

  registerUser(email: string, password: string): Observable<any> {

    const url = `${this.apiUrl}/odlagalisca/user/register`;
    return this.http.post(url, { email, password });
  }

// Function to perform user login
loginUser(email: string, password: string): Observable<any> {
  const url = `${this.apiUrl}/odlagalisca/user/login`; // Use the absolute URL
  return this.http.post<any>(url, { email, password });
}

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Function to get the user data
  getUserData(): any {
    return this.user;
  }

  // Function to set the login status and user data after successful login
  setLoggedIn(userData: any): void {
    this.loggedIn = true;
    this.user = userData;
  }

  // Function to log the user out
  logout(): void {
    this.loggedIn = false;
    this.user = null;
  }
}

