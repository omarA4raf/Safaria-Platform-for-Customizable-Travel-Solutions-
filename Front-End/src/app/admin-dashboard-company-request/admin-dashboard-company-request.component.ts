import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminDashboardCompanyRequestService } from './admin-dashboard-company-request.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../services/safe.pipe';

interface CompanyRequest {
  id: number;
  name: string;
  email: string;
  type: 'company';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SafePipe],
  selector: 'app-admin-dashboard-company-request',
  templateUrl: './admin-dashboard-company-request.component.html',
  styleUrls: ['./admin-dashboard-company-request.component.css'],
})
export class AdminDashboardCompanyRequestComponent implements OnInit {
  requests: CompanyRequest[] = [];
  selectedRequest: CompanyRequest | null = null;
  searchTerm: string = '';
  showDocumentModal = false;

  constructor(
    private requestService: AdminDashboardCompanyRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.requestService.getRequests().subscribe((requests) => {
      this.requests = requests;
    });
  }

  viewDocument(request: CompanyRequest): void {
    this.selectedRequest = request;
    this.showDocumentModal = true;
  }

  approveRequest(id: number): void {
    if (confirm('Are you sure you want to approve this request?')) {
      this.requestService.approveRequest(id).subscribe(() => {
        this.fetchRequests();
        this.closeModal();
      });
    }
  }

  rejectRequest(id: number): void {
    if (confirm('Are you sure you want to reject this request?')) {
      this.requestService.rejectRequest(id).subscribe(() => {
        this.fetchRequests();
        this.closeModal();
      });
    }
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(id).subscribe(() => {
        this.requests = this.requests.filter((r) => r.id !== id);
      });
    }
  }

  closeModal(): void {
    this.showDocumentModal = false;
    this.selectedRequest = null;
  }

  get filteredRequests(): CompanyRequest[] {
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