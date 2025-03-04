import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-gide-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tour-gide-sign-up.component.html',
  styleUrl: './tour-gide-sign-up.component.css'
})
export class TourGideSignUpComponent {

  tourguideName: string = '';
  tourguideemail: string = '';
  tourguidepassword: string = '';
  confirmPassword: string = '';
  tourguidephone: string = '';
  tourguideCountry: string = '';
  countries: string[] = []; // Dynamic country list
  countrySlugs: { name: string; slug: string }[] | undefined;
  idVerificationDocument: string = '';

  isPasswordStrong(tourguidepassword: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(tourguidepassword);
  }

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

  onSubmit() {
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

    const formData = {
      tourguideName: this.tourguideName,
      tourguideemail: this.tourguideemail,
      tourguidepassword: this.tourguidepassword,
      tourguidephone: this.tourguidephone,
      tourguideCountry: this.tourguideCountry,
      idVerificationDocument: this.idVerificationDocument,
    };

    console.log('Form Data:', formData);
  }
}
