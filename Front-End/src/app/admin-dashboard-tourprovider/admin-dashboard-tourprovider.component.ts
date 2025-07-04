import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../services/safe.pipe';
import { AuthService } from '../services/auth.service';
import { AdminDashboardTourproviderService } from './admin-dashboard-tourprovider.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatComponent } from '../shared/chat/chat.component';

interface TourProviderRequest {
  id: number;
  name: string;
  email: string;
  type: 'company' | 'tourguide';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}
@Component({
  selector: 'app-admin-dashboard-tourprovider',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatComponent],
  templateUrl: './admin-dashboard-tourprovider.component.html',
  styleUrls: ['./admin-dashboard-tourprovider.component.css'],
})
export class AdminDashboardTourproviderComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service

  requests: TourProviderRequest[] = [];
  selectedRequest: TourProviderRequest | null = null;
  searchTerm: string = '';
  showDocumentModal = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeTab: 'all' | 'companies' | 'tourguides' = 'all';
  generatedUrl: string = '';
  pdfUrl: SafeResourceUrl | undefined;
  constructor(
    private requestService: AdminDashboardTourproviderService,
    private router: Router,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    /*if (!this.authService.isLoggedIn()) {
      // Use window.location.href for full page reload in SSR
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      } else {
        this.router.navigate(['/login']);
      }
    }
    */
    this.fetchRequests();
    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';
  }

  fetchRequests(): void {
    this.isLoading = true;
    this.requestService.getRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
        this.errorMessage = 'Failed to load requests. Please try again.';
        this.isLoading = false;
      },
    });
  }

  viewDocument(request: TourProviderRequest): void {
    this.selectedRequest = request;
    this.generatedUrl =
      'http://localhost:8080/auth/files/TourProvider/' +
      this.selectedRequest.documentUrl.substring(
        this.selectedRequest.documentUrl.lastIndexOf('\\') + 1
      );
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.generatedUrl
    );
    this.showDocumentModal = true;
  }

  approveRequest(id: number): void {
    if (confirm('Are you sure you want to approve this tour provider?')) {
      this.isLoading = true;
      this.requestService.approveRequest(id).subscribe({
        next: () => {
          this.requests = this.requests.filter((r) => r.id !== id);
          this.successMessage = 'Tour provider approved and activated.';
          this.isLoading = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Error approving request:', err);
          this.errorMessage = 'Failed to approve request. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }

  rejectRequest(id: number): void {
    if (confirm('Are you sure you want to reject and delete this request?')) {
      this.isLoading = true;
      this.requestService.rejectRequest(id).subscribe({
        next: () => {
          this.requests = this.requests.filter((r) => r.id !== id);
          this.successMessage = 'Request rejected and deleted.';
          this.isLoading = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Error rejecting request:', err);
          this.errorMessage = 'Failed to reject request. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure you want to permanently delete this request?')) {
      this.isLoading = true;
      this.requestService.deleteRequest(id).subscribe({
        next: () => {
          this.requests = this.requests.filter((r) => r.id !== id);
          this.successMessage = 'Request deleted successfully.';
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error deleting request:', err);
          this.errorMessage = 'Failed to delete request. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }

  closeModal(): void {
    this.showDocumentModal = false;
    this.selectedRequest = null;
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  get filteredRequests(): TourProviderRequest[] {
    let filtered = this.requests;

    // Filter by active tab
    if (this.activeTab === 'companies') {
      filtered = filtered.filter((r) => r.type === 'company');
    } else if (this.activeTab === 'tourguides') {
      filtered = filtered.filter((r) => r.type === 'tourguide');
    }

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.name.toLowerCase().includes(term) ||
          request.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getDocumentType(url: string): string {
    return url.endsWith('.pdf') ? 'PDF' : 'Image';
  }

  getTypeDisplay(type: string): string {
    return type === 'company' ? 'Company' : 'Tour Guide';
  }

  logout(): void {
    this.authService.logout();
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
