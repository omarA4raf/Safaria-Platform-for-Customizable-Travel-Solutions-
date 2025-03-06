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
  businesslicenseDocument: string | null = null; // Store Base64 string

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const fileInput = this.businesslicenseDocumentInput.nativeElement;

    fileInput.addEventListener('change', (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.businesslicenseDocument = e.target?.result as string; // Base64 encoded string
        };

        reader.readAsDataURL(file); // Read file as Base64
      }
    });
  }

  sendToBackend(formData: any): void {
    this.http.post('/api/companysignup', formData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
  }

  isPasswordStrong(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  onSubmit(): void {
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
      phoneNumber: this.phoneNumber,
      businesslicenseDocument: this.businesslicenseDocument,
    };

    console.log('Form Data:', formData);
    this.sendToBackend(formData); // Send form data to the backend
  }
};