import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { LoginServices } from '../services/login_services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule and HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variables to store form data
  selectedUserKind: string = '';
  email: string = '';
  password: string = '';

  // Inject HttpClient and Router
  constructor(private login_services:LoginServices,private http: HttpClient, private router: Router) {}

  // Method to update the selected user kind
  selectUserKind(kind: string) {
    this.selectedUserKind = kind;
  }

  // Method to handle form submission
  onSubmit() {
    // Create the payload to send to the backend
    const payload = {
      userKind: this.selectedUserKind,
      email: this.email,
      password: this.password
    };

    // Debug: Log the form data
    console.log('Form submitted with data:', payload);

    // Send the data to the backend
    //this.http.get<any>(`http://localhost:8080/login/touristlogin/${this.email}/${this.password}`)
      this.login_services.login(this.email,this.password,this.selectedUserKind)
      .subscribe({
        next: (response: any) => {
          if(response==null){
            alert('Login failed. Please check your credentials.');
          }
          else{
          console.log('Login successful:', response);
          // Navigate to the appropriate page based on the user kind
          if (this.selectedUserKind === 'Tourist') {
            this.router.navigate(['/tourist-dashboard']);
          } else if (this.selectedUserKind === 'Tour Guide') {
            this.router.navigate(['/tourguide-dashboard']);
          } else if (this.selectedUserKind === 'Company') {
            this.router.navigate(['/company-dashboard']);
          } else {
            console.error('Unknown user kind:', this.selectedUserKind);
            alert('Unknown user kind. Please contact support.');
          }
        }
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}