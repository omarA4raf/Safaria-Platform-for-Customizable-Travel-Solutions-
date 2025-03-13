import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-gide-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tour-gide-sign-up.component.html',
  styleUrl: './tour-gide-sign-up.component.css',
})
export class TourGideSignUpComponent implements OnInit {
  @ViewChild('idDocumentInput') idDocumentInput!: ElementRef;

  tourguideName: string = '';
  tourguideemail: string = '';
  tourguidepassword: string = '';
  confirmPassword: string = '';
  tourguidephone: string = '';
  tourguideCountry: string = '';
  countries: string[] = [];
  countrySlugs: { name: string; slug: string }[] = [];
  idDocument: File | null = null; // Store the file as a File object
  isLoading: boolean = false; // Loading state
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.initializeCountries();
  }

  // Initialize the list of countries and their slugs
  initializeCountries(): void {
    this.countries = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahrain',
      'Bangladesh',
      'Belgium',
      'Brazil',
      'Canada',
      'China',
      'Colombia',
      'Denmark',
      'Egypt',
      'Finland',
      'France',
      'Germany',
      'Greece',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Italy',
      'Japan',
      'Jordan',
      'Kenya',
      'Kuwait',
      'Lebanon',
      'Malaysia',
      'Mexico',
      'Morocco',
      'Netherlands',
      'New Zealand',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russia',
      'Saudi Arabia',
      'South Africa',
      'Spain',
      'Sudan',
      'Sweden',
      'Switzerland',
      'Syria',
      'Thailand',
      'Tunisia',
      'Turkey',
      'UAE',
      'UK',
      'Ukraine',
      'USA',
      'Vietnam',
      'Yemen',
    ];

    // Generate slugs for each country
    this.countrySlugs = this.countries.map((country) => ({
      name: country,
      slug: country.toLowerCase().replace(/\s+/g, '-'),
    }));
  }

  // Check if the password is strong
  isPasswordStrong(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  // Handle file input change
  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.idDocument = fileInput.files[0]; // Store the file as a File object
    } else {
      this.idDocument = null;
    }
  }

  // Validate form fields
  validateForm(): boolean {
    if (
      !this.tourguideName ||
      !this.tourguideemail ||
      !this.tourguidepassword ||
      !this.confirmPassword ||
      !this.tourguidephone ||
      !this.tourguideCountry ||
      !this.idDocument
    ) {
      this.errorMessage = 'All fields are required.';
      return false;
    }

    if (!this.tourguideemail.includes('@')) {
      this.errorMessage = 'Invalid email format.';
      return false;
    }

    if (this.tourguidepassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return false;
    }

    if (!this.isPasswordStrong(this.tourguidepassword)) {
      this.errorMessage =
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }

  // Handle form submission
  onSubmit(form: any): void {
    this.errorMessage = null; // Reset error message

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true; // Enable loading state

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append('tourguideName', this.tourguideName);
    formData.append('tourguideemail', this.tourguideemail);
    formData.append('tourguidepassword', this.tourguidepassword);
    formData.append('tourguidephone', this.tourguidephone);
    formData.append('tourguideCountry', this.tourguideCountry);
    if (this.idDocument) {
      formData.append('idDocument', this.idDocument); // Append the file
    }

    this.sendToBackend(formData);
  }

  // Send form data to the backend
  sendToBackend(formData: FormData): void {
    this.http.post('http://localhost:8080/api/tourguidesignup', formData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.isLoading = false; // Disable loading state on error

        // Handle specific backend errors
        if (error.status === 400) {
          this.errorMessage = 'Invalid email or password.';
        } else if (error.status === 404) {
          this.errorMessage = 'Endpoint not found.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      },
      complete: () => {
        this.isLoading = false; // Disable loading state on completion
      },
    });
  }
}