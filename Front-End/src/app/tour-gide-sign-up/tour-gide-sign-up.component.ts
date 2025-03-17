import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignUpServices } from '../services/signup_sevices';
import { tourguide } from '../objects/tourguide';

@Component({
  selector: 'app-tour-gide-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tour-gide-sign-up.component.html',
  styleUrls: ['./tour-gide-sign-up.component.css'],
})
export class TourGideSignUpComponent implements OnInit {
  @ViewChild('idDocumentInput') idDocumentInput!: ElementRef;

  // Form fields
  tourguideName: string = '';
  tourguideemail: string = '';
  tourguidepassword: string = '';
  confirmPassword: string = '';
  tourguidephone: string = '';
  tourguideCountry: string = '';
  idDocument: File | null = null;
  selectedTourismTypes: string[] = [];
  tourismTypes: string[] = [
    'cultural',
    'adventure',
    'beach',
    'historical',
    'wildlife',
    'religious',
  ];
  countrySlugs: { name: string; slug: string }[] = [];

  // State management
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private signup_services: SignUpServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeCountries();
  }

  // Initialize the list of countries and their slugs
  initializeCountries(): void {
    const countries = [
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

    this.countrySlugs = countries.map((country) => ({
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.idDocument = input.files[0];
    } else {
      this.idDocument = null;
    }
  }

  // Toggle tourism type selection
  toggleTourismType(type: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTourismTypes.push(type);
    } else {
      this.selectedTourismTypes = this.selectedTourismTypes.filter(
        (t) => t !== type
      );
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
      !this.idDocument ||
      this.selectedTourismTypes.length === 0
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
    if (!this.validateForm()) return;

    this.isLoading = true;


    const formData = new FormData();
    formData.append('username', this.tourguideName);
    formData.append('email', this.tourguideemail);
    formData.append('password', this.tourguidepassword);
    formData.append('phone', this.tourguidephone);
    formData.append('country', this.tourguideCountry);
    // Append each tourism type individually
    for (let i = 0; i < this.selectedTourismTypes.length; i++) {
      formData.append(`tourismTypes[${i}]`, this.selectedTourismTypes[i]);
    }

    if (this.idDocument) {
      formData.append('approvalDocument', this.idDocument);
    }

    this.signup_services.signup(formData, 'Tour Guide').subscribe({
      next: (data) => {
        if (data == null) {
          this.errorMessage = 'Email or Username already exists.';
        } else {
          alert('You have successfully signed up. Please verify your email!');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });

    console.log(formData)
  }
}
