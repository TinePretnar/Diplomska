import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  Failedlogin: boolean = false;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private userService: UserService) { }

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

    // Call the backend service to perform login
    this.userService.loginUser(this.email, this.password).subscribe(
      (user) => {
        // If login is successful, user will be the user object
        this.userService.setLoggedIn(user);
        this.Failedlogin = false;
        this.dialogRef.close();
      },
      (error) => {
        // If login fails, error will contain the error message from the backend
        this.Failedlogin = true;
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
}
