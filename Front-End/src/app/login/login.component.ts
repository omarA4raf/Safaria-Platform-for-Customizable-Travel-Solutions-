import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { LoginServices } from '../services/login_services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule and HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variables to store form data
  selectedUserKind: string = '';
  email: string = '';
  password: string = '';

  // Variables for error handling and loading state
  errorMessage: string = '';
  isLoading: boolean = false;

  // Inject HttpClient and Router
  constructor(private login_services: LoginServices, private http: HttpClient, private router: Router) {}

  // Method to update the selected user kind
  selectUserKind(kind: string) {
    this.selectedUserKind = kind;
  }

  // Method to handle form submission
  onSubmit(form: any) {
      console.log('Form submitted:', form);
      console.log('Form valid:', form.valid);
      console.log('Form controls:', form.controls);
    
      // Reset error message
      this.errorMessage = '';
    
      // Check if the form is invalid
      if (form.invalid) {
        console.log('Form is invalid');
        this.errorMessage = 'Please fill out all required fields.';
        return;
      }

    // Check if the form is invalid
    if (form.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    // Validate email format
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    // Set loading state to true
    this.isLoading = true;

    // Create the payload to send to the backend
    const payload = {
      userKind: this.selectedUserKind,
      email: this.email,
      password: this.password
    };

    // Debug: Log the form data
    console.log('Form submitted with data:', payload);

    // Send the data to the backend
    this.login_services.login(this.email, this.password, this.selectedUserKind)
      .subscribe({
        next: (response: any) => {
          // Set loading state to false
          this.isLoading = false;

          if (response === null) {
            this.errorMessage = 'Login failed. Please check your credentials.';
          } else {
            console.log('Login successful:', response);
            // Navigate to the appropriate page based on the user kind
            if (this.selectedUserKind === 'Tourist') {
              this.router.navigate(['/touristdashboardhome']);
            } else if (this.selectedUserKind === 'Tour Guide') {
              this.router.navigate(['/tourguidesdashboard']);
            } else if (this.selectedUserKind === 'Company') {
              this.router.navigate(['/companydashboard']);
            } else {
              console.error('Unknown user kind:', this.selectedUserKind);
              this.errorMessage = 'Unknown user kind. Please contact support.';
            }
          }
        },
        error: (error) => {
          // Set loading state to false
          this.isLoading = false;

          // Handle specific error messages from the backend
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Login failed. Please check your credentials.';
          }
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
  }

  // Method to validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Team@1234