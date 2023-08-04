import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service'; // Import the user service

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  capthcha: string;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordsMatch: boolean = true;
  emailExists: boolean = false;
  emailInvalid: boolean = false;
  notHuman: boolean = false;

  constructor(private dialogRef: MatDialogRef<RegistrationComponent>, private userService: UserService) {
    this.capthcha = '';
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    // Check if the email is a valid email format
    if (!this.validateEmail(this.email)) {
      // Display error message for invalid email format
      console.log('Invalid email format.');
      this.emailInvalid = true
      return;
    }else{
      this.emailInvalid = false
    }
  
    if (this.password !== this.confirmPassword) {
      // Display error message for passwords not matching
      console.log('Passwords do not match.');
      this.passwordsMatch = false;
      return;
    }

     // Check if the captcha is not empty
   if (this.capthcha.trim() === '') {
    // Display error message for empty captcha
      console.log('Captcha is required.');
      this.notHuman = true
    // You can set a flag or error message here to show on the UI
      return;
    }
  
    // Call the backend service to check if the email exists
    this.userService.checkEmailExists(this.email).subscribe(
      (result) => {
        if (result) {
          // Display error message for existing email
          console.log('Email already exists.');
          this.emailExists = true;
        } else {
          this.emailExists = false;
          // Register the user by calling the registerUser method from UserService
          this.userService.registerUser(this.email, this.password).subscribe(
            (response) => {
              // Registration successful
              console.log('Registered with email:', this.email, 'and password:', this.password);
              // Close the dialog after registration
              this.dialogRef.close();
            },
            (error) => {
              console.error('Error registering user:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking email existence:', error);
      }
    );
  }
  

  onCancel(): void {
    // Close the dialog without registration
    this.dialogRef.close();
  }

// Function to validate the email format
validateEmail(email: string): boolean {
  // Regular expression to check if the email is in a valid format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

  // Function to check if passwords match
  doPasswordsMatch(): boolean {
    console.log(this.password)
    console.log(this.confirmPassword)
    this.passwordsMatch = this.password == this.confirmPassword;
    console.log(this.passwordsMatch)
    return this.passwordsMatch
  }

public resolved(capthchaResponse: string){
  this.capthcha = capthchaResponse;
  console.log('resolved captcha with response: ' + this.capthcha);
}
  

}
