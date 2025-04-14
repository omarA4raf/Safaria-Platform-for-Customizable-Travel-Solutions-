import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminDashboardTourguideRequestService } from './admin-dashboard-tourguide-request.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SafePipe } from '../services/safe.pipe';

interface Request {
  id: number;
  name: string;
  email: string;
  type: 'tourguide';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}


@Component({
  selector: 'app-admin-dashboard-tourguide-request',
  imports: [CommonModule, HttpClientModule, FormsModule, SafePipe], // Add FormsModule here
  standalone: true, // Mark as standalone
  templateUrl: './admin-dashboard-tourguide-request.component.html',
  styleUrl: './admin-dashboard-tourguide-request.component.css'
})
export class AdminDashboardTourguideRequestComponent {
  requests: Request[] = [];
  selectedRequest: Request | null = null;
  searchTerm: string = '';
  showDocumentModal = false;

   constructor(
    private admindashboardtourguiderequest: AdminDashboardTourguideRequestService, 
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.admindashboardtourguiderequest.getRequests().subscribe((requests) => {
      this.requests = requests;
    });
  }

  viewDocument(request: Request): void {
    this.selectedRequest = request;
    this.showDocumentModal = true;
  }

  approveRequest(id: number): void {
    if (confirm('Are you sure you want to approve this request?')) {
      this.admindashboardtourguiderequest.approveRequest(id).subscribe(() => {
        this.fetchRequests();
        this.closeModal();
      });
    }
  }

  rejectRequest(id: number): void {
    if (confirm('Are you sure you want to reject this request?')) {
      this.admindashboardtourguiderequest.rejectRequest(id).subscribe(() => {
        this.fetchRequests();
        this.closeModal();
      });
    }
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.admindashboardtourguiderequest.deleteRequest(id).subscribe(() => {
        this.requests = this.requests.filter((r) => r.id !== id);
      });
    }
  }

  closeModal(): void {
    this.showDocumentModal = false;
    this.selectedRequest = null;
  }

  get filteredRequests(): Request[] {
    if (!this.searchTerm) return this.requests;
    return this.requests.filter(request => 
      request.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getDocumentType(url: string): string {
    return url.endsWith('.pdf') ? 'PDF' : 'Image';
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}