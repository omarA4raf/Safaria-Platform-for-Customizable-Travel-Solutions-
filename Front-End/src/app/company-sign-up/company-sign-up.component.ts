import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-sign-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.css'
})
export class CompanySignUpComponent {

  companyName: string = '';
  companyemail: string = '';
  companypassword: string = '';
  confirmPassword: string = '';
  businessLicense: string = '';
  businesslicenseDocument: string = '';

  isPasswordStrong(companypassword: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(companypassword);
  }

  onSubmit() {

    if (this.companypassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.isPasswordStrong(this.companypassword)) {
      alert(
        'Password is weak! It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }
    const formData = {
      companyName: this.companyName,
      companyemail: this.companyemail,
      companypassword: this.companypassword,
      businessLicense: this.businessLicense,
      businesslicenseDocument: this.businesslicenseDocument};

    console.log('Form Data:', formData);
  }
}
