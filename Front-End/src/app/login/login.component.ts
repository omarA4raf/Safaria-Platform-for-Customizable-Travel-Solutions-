import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule and HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variables to store form data
  username: string = '';
  password: string = '';

  // Inject HttpClient and Router
  constructor(private http: HttpClient, private router: Router) {}

  // Method to handle form submission
  onSubmit() {
    // Create the payload to send to the backend
    const payload = {
      username: this.username,
      password: this.password
    };

    // Debug: Log the form data
    console.log('Form submitted with data:', payload);

    // Send the data to the backend
    this.http.post('http://localhost:8080/login', payload)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          // Navigate to the appropriate page based on the user role returned by the backend
          if (response.role === 'tourist') {
            this.router.navigate(['/tourist-dashboard']);
          } else if (response.role === 'tourguide') {
            this.router.navigate(['/tourguide-dashboard']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            console.error('Unknown role:', response.role);
            alert('Unknown user role. Please contact support.');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}