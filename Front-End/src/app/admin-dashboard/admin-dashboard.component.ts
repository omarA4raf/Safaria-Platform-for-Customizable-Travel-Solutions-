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
import { ChatComponent } from '../shared/chat/chat.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {

  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service
  errorMessage: string | null = null;

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
  editedUser: User | null = null;
  @ViewChild('addUserModal') addUserModal!: ElementRef;
  @ViewChild('editUserModal') editUserModal!: ElementRef;

  constructor(
    private adminService: AdminDashboardService,
    private router: Router,
    private modalService: NgbModal,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check authentication and admin role
    /* if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUserRole = this.authService.getUserType();

    // Verify admin access
    if (this.currentUserRole !== 'admin') {
      console.warn('Non-admin user attempted to access admin dashboard');
      this.router.navigate(['/']);
      return;
    }
    */

    this.fetchUsers();

    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';
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

  deleteUser(id: number, role: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id, this.getRoleName(role)).subscribe({
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
    this.editedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    this.editUserData = { ...user };
    this.openEditModal();
  }

  updateUser(): void {
    if (this.editUserData) {
      console.log('Updating user with data:', this.editUserData); // Debug log
      this.adminService
        .updateUser(this.editedUser, this.editUserData)
        .subscribe({
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
  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }
}
