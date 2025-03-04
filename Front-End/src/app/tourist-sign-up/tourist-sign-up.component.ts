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
  styleUrl: './tourist-sign-up.component.css',
})
export class TouristSignUpComponent implements OnInit {
  constructor(private signup_services:SignUpServices){}
  touristemail: string = '';
  touristpassword: string = '';
  confirmPassword: string = '';
  touristphone: string = '';
  selectedTourismTypes: string[] = [];
  touristCountry: string = '';
  countries: string[] = []; // Dynamic country list
  countrySlugs: { name: string; slug: string }[] | undefined;
  tourist=new Tourist();
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
      email: this.touristemail,
      password: this.touristpassword,
      phone: this.touristphone,
      selectedTourismTypes: this.selectedTourismTypes,
      country: this.touristCountry,
    };
    this.tourist.email=this.touristemail;
    this.tourist.password=this.touristpassword;
    this.tourist.phone=this.touristphone;
    this.tourist.tourismTypes=this.selectedTourismTypes
    this.tourist.country=this.touristCountry;
    this.signup_services.signup(this.tourist,'Tourist').subscribe((data) => {
      if (data == null) {
        alert('Email or Username already exists');
      }
      else{
        alert("You have successfully sign up, please verify your mail!");
      }
    });
    console.log('Form Data:', formData);
  }
}
