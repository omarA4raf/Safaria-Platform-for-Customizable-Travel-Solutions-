import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.css',
})
export class CompanySignUpComponent implements OnInit {
  @ViewChild('businesslicenseDocumentInput') businesslicenseDocumentInput!: ElementRef;

  companyName: string = '';
  companyemail: string = '';
  companypassword: string = '';
  confirmPassword: string = '';
  businessLicense: string = '';
  phoneNumber: string = '';
  businesslicenseDocument: File | null = null; // Use File type instead of string
  isLoading: boolean = false; // Loading state
  errorMessage: string | null = null; // Error message

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // No changes needed here
  }

  // Handle file input change
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.businesslicenseDocument = input.files[0]; // Store the file
      console.log('File selected:', this.businesslicenseDocument.name); // Debugging
    } else {
      this.businesslicenseDocument = null; // Reset if no file is selected
    }
  }

  // Check if the password is strong
  isPasswordStrong(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  // Handle form submission
  onSubmit(form: any): void {
    this.errorMessage = null; // Reset error message

    // Validate form fields
    if (
      !this.companyName ||
      !this.companyemail ||
      !this.companypassword ||
      !this.confirmPassword ||
      !this.businessLicense ||
      !this.phoneNumber ||
      !this.businesslicenseDocument
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.companyemail.includes('@')) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    if (this.companypassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.isPasswordStrong(this.companypassword)) {
      this.errorMessage =
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
      return;
    }

    this.isLoading = true; // Enable loading state

    // Prepare form data
    const formData = new FormData();
    formData.append('companyName', this.companyName);
    formData.append('companyemail', this.companyemail);
    formData.append('companypassword', this.companypassword);
    formData.append('businessLicense', this.businessLicense);
    formData.append('phoneNumber', this.phoneNumber);
    if (this.businesslicenseDocument) {
      formData.append('businesslicenseDocument', this.businesslicenseDocument);
    }

    // Send data to the backend
    this.http.post('/api/companysignup', formData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      },
      complete: () => {
        this.isLoading = false; // Disable loading state
      },
    });
  }
}