import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminDashboardService } from './admin-dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    id: 0,
    name: '',
    email: '',
    role: 1,
  };
  editUserData: User | null = null;
  searchTerm: string = '';
  currentUserRole: string | null = null;

  @ViewChild('addUserModal') addUserModal!: ElementRef;
  @ViewChild('editUserModal') editUserModal!: ElementRef;

  constructor(
    private adminService: AdminDashboardService,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check authentication and admin role
    if (!this.authService.isLoggedIn()) {
            // Use window.location.href for full page reload in SSR

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      } else {
        this.router.navigate(['/login']);
      }
    }

    this.currentUserRole = this.authService.getUserType();

    // Verify admin access
    if (this.currentUserRole !== 'admin') {
      console.warn('Non-admin user attempted to access admin dashboard');
      this.router.navigate(['/']);
      return;
    }

    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        // Handle error (e.g., show toast message)
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  openAddModal(): void {
    this.modalService.open(this.addUserModal);
  }

  openEditModal(): void {
    this.modalService.open(this.editUserModal);
  }

  addUser(): void {
    this.adminService.addUser(this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        // Reset form
        this.newUser = { id: 0, name: '', email: '', role: 1 };
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Error adding user:', err);
        // Show error message to user
      },
    });
  }

  startEdit(user: User): void {
    this.editUserData = { ...user };
    this.openEditModal();
  }

  updateUser(): void {
    if (this.editUserData) {
      console.log('Updating user with data:', this.editUserData); // Debug log
      this.adminService.updateUser(this.editUserData).subscribe({
        next: (updatedUser) => {
          console.log('Updated user received:', updatedUser); // Debug log
          const index = this.users.findIndex((u) => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.editUserData = null;
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }
  }

  cancelEdit(): void {
    this.editUserData = null;
    this.modalService.dismissAll();
  }

  get filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getRoleName(role: number | string): string {
    const roleNum = typeof role === 'string' ? parseInt(role) : role;

    switch (roleNum) {
      case 1:
        return 'Tourist';
      case 2:
        return 'Company';
      case 3:
        return 'Tour Guide';
      case 4:
        return 'Admin';
      default:
        console.warn('Unknown role value:', role);
        return 'Unknown';
    }
  }

  logout(): void {
    this.authService.logout(); // Use centralized logout
    this.router.navigate(['/']);
  }
}
