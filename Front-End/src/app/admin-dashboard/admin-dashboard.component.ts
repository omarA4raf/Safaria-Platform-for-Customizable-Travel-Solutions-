import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminDashboardService } from './admin-dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface User {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
  role: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    id: 0,
    profilePicture: '/assets/img/client 2.jpeg',
    name: '',
    email: '',
    role: 1,
  };

  constructor(private adminService: AdminDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: number): void {
    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }

  addUser(): void {
    this.adminService.addUser(this.newUser).subscribe((user) => {
      this.users.push(user);
      this.newUser = { id: 0, profilePicture: '/assets/img/client 2.jpeg', name: '', email: '', role: 1 };
    });
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

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}