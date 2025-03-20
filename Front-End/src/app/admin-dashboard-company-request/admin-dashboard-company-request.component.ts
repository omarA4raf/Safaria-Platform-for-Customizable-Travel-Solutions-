import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router

interface User {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
  role: number;
}

@Component({
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule here
  selector: 'app-admin-dashboard-company-request',
  templateUrl: './admin-dashboard-company-request.component.html',
  styleUrls: ['./admin-dashboard-company-request.component.css'],
})

export class AdminDashboardCompanyRequestComponent   {
  constructor(private router: Router) {} // Inject Router
  private users: User[] = [
    {
      id: 1,
      profilePicture: 'assets/images/profile-placeholder.png',
      name: 'John Doe',
      email: 'abcd@email.com',
      role: 1,
    },
    {
      id: 2,
      profilePicture: 'assets/images/profile-placeholder.png',
      name: 'Jane Smith',
      email: 'abcd@email.com',
      role: 2,
    },
    {
      id: 3,
      profilePicture: 'assets/images/profile-placeholder.png',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getRoleName(role: number): string {
    switch (role) {
      case 1:
        return 'Tourist';
      case 2:
        return 'Company';
      case 3:
        return 'Tour Guide';
      default:
        return 'Unknown';
    }
  }

  // Method to handle logout
  logout(): void {
    this.router.navigate(['/']); // Navigate to the home page
    sessionStorage.clear(); // Clear sessionStorage
  }
}
