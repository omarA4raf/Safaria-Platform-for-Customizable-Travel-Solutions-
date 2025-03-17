import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Tourist } from '../objects/Tourist';
import { SignUpServices } from '../services/signup_sevices';

@Component({
  selector: 'app-tourist-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tourist-sign-up.component.html',
  styleUrls: ['./tourist-sign-up.component.css'],
})
export class TouristSignUpComponent implements OnInit {
  touristName: string = '';
  touristemail: string = '';
  touristpassword: string = '';
  confirmPassword: string = '';
  touristphone: string = '';
  selectedTourismTypes: string[] = [];
  touristCountry: string = '';
  countries: string[] = []; // Dynamic country list
  countrySlugs: { name: string; slug: string }[] | undefined;
  tourist = new Tourist();
  isLoading: boolean = false; // Loading state
  errorMessage: string | null = null; // Error message

  constructor(private signup_services: SignUpServices, private router: Router) {}

  ngOnInit(): void {
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

    this.countrySlugs = this.countries.map((country) => ({
      name: country,
      slug: country.toLowerCase().replace(/\s+/g, '-'),
    }));
  }

  // Check if the password is strong
  isPasswordStrong(touristpassword: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(touristpassword);
  }

  // Toggle tourism type selection
  toggleTourismType(type: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTourismTypes.push(type);
    } else {
      this.selectedTourismTypes = this.selectedTourismTypes.filter(
        (t) => t !== type
      );
    }
  }

  // Handle form submission
  onSubmit(form: any) {
    this.errorMessage = null; // Reset error message

    // Validate form fields
    if (
      !this.touristName ||
      !this.touristemail ||
      !this.touristpassword ||
      !this.confirmPassword ||
      !this.touristphone ||
      !this.touristCountry ||
      this.selectedTourismTypes.length === 0
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.touristemail.includes('@')) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    if (this.touristpassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.isPasswordStrong(this.touristpassword)) {
      this.errorMessage =
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
      return;
    }

    this.isLoading = true; // Enable loading state

    // Prepare form data
    this.tourist.email = this.touristemail;
    this.tourist.password = this.touristpassword;
    this.tourist.username = this.touristName;
    this.tourist.phone = this.touristphone;
    this.tourist.tourismTypes = this.selectedTourismTypes;
    this.tourist.country = this.touristCountry;

    // Send data to the backend
    this.signup_services.signup(this.tourist, 'Tourist').subscribe({
      next: (data) => {
        if (data == null) {
          this.errorMessage = 'Email or Username already exists.';
        } else {
          alert('You have successfully signed up. Please verify your email!');
          this.router.navigate(['/login']); // Redirect to login page
        }
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      },
      complete: () => {
        this.isLoading = false; // Disable loading state
      },
    })
  }
};

// Team@1234;;;