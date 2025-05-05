import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login_services';
import { UserRole } from '../services/login_services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
  constructor(
    private loginServices: LoginServices,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
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
      password: this.password,
    };

    // Debug: Log the form data
    console.log('Form submitted with data:', payload);

    // Send the data to the backend
    this.loginServices
      .login(this.email, this.password, this.selectedUserKind as UserRole )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;

          if (response === null) {
            this.errorMessage = 'Login failed. Please check your credentials.';
          } else {
            console.log('Login successful:', response);

            // Store token using AuthService if available
            if (response.token) {
            this.authService.setSession({token:response.token,
              userId:response.userId,
              userType:response.role


            })
            }
            
            // Maintain your exact original navigation logic
            if (this.selectedUserKind === 'Tourist') {
              this.router.navigate(['/touristdashboardhome']);
            } else if (this.selectedUserKind === 'Tour Guide') {
              this.router.navigate(['/tourguidesdashboard']);
            } else if (this.selectedUserKind === 'Company') {
              this.router.navigate(['/companydashboard']).then(success => {
                console.log('Navigation success?', success);
              }).catch(error => {
                console.error('Navigation error:', error);
              });
              console.log(this.selectedUserKind)
              // this.router.navigate(['/companydashboard']);
            } else if (this.selectedUserKind === 'Admin') {
              this.router.navigate(['/admindashboard']);
            }
             else {
              console.error('Unknown user kind:', this.selectedUserKind);
              this.errorMessage = 'Unknown user kind. Please contact support.';
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Login failed. Please check your credentials.';
          }
          console.error('Login failed:', error);
        },
        },
      );
  }

  // Method to validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Team@1234

