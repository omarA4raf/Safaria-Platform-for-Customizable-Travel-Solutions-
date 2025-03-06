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
  @ViewChild('idDocumentInput') idDocumentInput!: ElementRef; // Reference to the file input

  tourguideName: string = '';
  tourguideemail: string = '';
  tourguidepassword: string = '';
  confirmPassword: string = '';
  tourguidephone: string = '';
  tourguideCountry: string = '';
  countries: string[] = []; // Dynamic country list
  countrySlugs: { name: string; slug: string }[] = [];
  idDocument: string | null = null; // Store Base64 string for the ID document

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.initializeCountries(); // Initialize the list of countries

    const fileInput = this.idDocumentInput.nativeElement;

    // Listen for file input changes
    fileInput.addEventListener('change', (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.idDocument = e.target?.result as string; // Base64 encoded string
        };

        reader.readAsDataURL(file); // Read file as Base64
      }
    });
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

  // Handle form submission
  onSubmit(): void {
    if (this.tourguidepassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.isPasswordStrong(this.tourguidepassword)) {
      alert(
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }

    // Team@1234

    const formData = {
      tourguideName: this.tourguideName,
      tourguideemail: this.tourguideemail,
      tourguidepassword: this.tourguidepassword,
      tourguidephone: this.tourguidephone,
      tourguideCountry: this.tourguideCountry,
      idDocument: this.idDocument, // Include the Base64-encoded ID document
    };

    console.log('Form Data:', formData);
    this.sendToBackend(formData); // Send form data to the backend
  }

  // Send form data to the backend
  sendToBackend(formData: any): void {
    this.http.post('/api/tourguidesignup', formData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
  }
};