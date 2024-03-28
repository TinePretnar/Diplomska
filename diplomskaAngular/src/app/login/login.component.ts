import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  capthcha: string;
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  Failedlogin: boolean = false;
  failedAttempts: number = 0;
  showCaptcha: boolean = false; // Add this variable to control the visibility of reCAPTCHA
  notHuman: boolean = false;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private userService: UserService) { 
    this.capthcha = '';  
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    // Check if the email is a valid email format
    if (!this.validateEmail(this.email)) {
      // Display error message for invalid email format
      console.log('Invalid email format.');
      this.emailInvalid = true;
      return;
    } else {
      this.emailInvalid = false;
    }
      // Check if the reCAPTCHA is visible and not solved
    if (this.showCaptcha && !this.capthcha.trim()) {
      // Display error message for empty reCAPTCHA
      console.log('reCAPTCHA is required.');
      this.notHuman = true;
      return;
    }

    // Call the backend service to perform login
    this.userService.loginUser(this.email, this.password).subscribe(
      (user) => {
        // If login is successful, user will be the user object
        this.userService.setLoggedIn(user);
        this.Failedlogin = false;
        this.failedAttempts = 0; // Reset failed login attempts
        this.dialogRef.close();
      },
      (error) => {
        // If login fails, error will contain the error message from the backend
        this.Failedlogin = true;
        this.failedAttempts++;
        if (this.failedAttempts >= 2) {
          this.showCaptcha = true; // Show reCAPTCHA after two failed attempts
        }
        console.log('Login failed:', error);
      }
    );
  }

  onCancel(): void {
    // Close the dialog without logging in
    this.Failedlogin = false;
    this.dialogRef.close();
  }

  // Function to validate the email format (same as in your previous code)
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  public resolved(capthchaResponse: string){
    this.capthcha = capthchaResponse;
    console.log('resolved captcha with response: ' + this.capthcha);
  }
}

