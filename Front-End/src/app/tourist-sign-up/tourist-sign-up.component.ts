import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tourist-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tourist-sign-up.component.html',
  styleUrl: './tourist-sign-up.component.css',
})
export class TouristSignUpComponent implements OnInit {
  touristemail: string = '';
  touristpassword: string = '';
  confirmPassword: string = '';
  touristphone: string = '';
  selectedTourismTypes: string[] = [];
  touristCountry: string = '';
  countries: string[] = []; // Dynamic country list
  countrySlugs: { name: string; slug: string }[] | undefined;

  isPasswordStrong(touristpassword: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(touristpassword);
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

  onSubmit() {
    if (this.touristpassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.isPasswordStrong(this.touristpassword)) {
      alert(
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }

    const formData = {
      touristemail: this.touristemail,
      touristpassword: this.touristpassword,
      touristphone: this.touristphone,
      selectedTourismTypes: this.selectedTourismTypes,
      touristCountry: this.touristCountry,
    };

    console.log('Form Data:', formData);
  }
}
