import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';


interface User {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
  role: number;
}

@Component({
  selector: 'app-admin-dashboard-tourguide-request',
  imports: [CommonModule], // Import CommonModule here
  standalone: true, // Mark as standalone
  templateUrl: './admin-dashboard-tourguide-request.component.html',
  styleUrl: './admin-dashboard-tourguide-request.component.css'
})
export class AdminDashboardTourguideRequestComponent {
  [x: string]: any;
  private users: User[] = [
    {
      id: 1,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'John Doe',
      email: 'abcd@email.com',
      role: 1,
    },
    {
      id: 2,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Jane Smith',
      email: 'abcd@email.com',
      role: 2,
    },
    {
      id: 3,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    },
    {
    id: 4,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'John Doe',
      email: 'abcd@email.com',
      role: 1,
    },
    {
      id: 5,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Jane Smith',
      email: 'abcd@email.com',
      role: 2,
    },
    {
      id: 6,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    },
    {
      id: 6,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    },
    {
      id: 6,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    },
    {
      id: 6,
      profilePicture: '/assets/img/client 2.jpeg',
      name: 'Alice Johnson',
      email: 'abcd@email.com',
      role: 3,
    }
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
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this['router'].navigate(['/']); // Navigate to the home page
  }
}