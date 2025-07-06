// admin-dashboard-reportedusers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../services/safe.pipe';
import { AuthService } from '../services/auth.service';
import { AdminDashboardReportedusersService } from './admin-dashboard-reports.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatComponent } from '../shared/chat/chat.component';
import { Observable, of } from 'rxjs';

interface ReportedUser {
  id: number;
  name: string;
  email: string;
  type: 'tourist' | 'guide' | 'company';
  reportCount: number;
  status: 'active' | 'suspended' | 'pending_review';
  lastReportedAt: Date;
}

interface ReportRequest {
  id: number;
  reporterId: number;
  reporterName: string;
  reportedUserId: number;
  reportedUserName: string;
  postId?: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
interface PostDetails {
  id: number;
  authorName: string;
  content: string;
  imageUrl?: SafeResourceUrl;
  createdAt: Date;
}
interface Blog{
    blogId : string;
    username : string;
    content : string;
    role : 'Tourist';
    createdAt : string;
    photo_path : string[];
  }
@Component({
  selector: 'app-admin-dashboard-reportedusers',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatComponent],
  templateUrl: './admin-dashboard-reports.component.html',
  styleUrls: ['./admin-dashboard-reports.component.css'],
  providers: [AdminDashboardReportedusersService]
})
export class AdminDashboardReportsComponent implements OnInit {
  userId = '123';
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'admin';
  
  reportedUsers: ReportedUser[] = [];
  reportRequests: ReportRequest[] = [];
  selectedReport: ReportRequest | null = null;
  selectedPost: any;
  searchTerm: string = '';
  showReportModal = false;
  showPostModal = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeTab: 'all' | 'reported' | 'requests' = 'all';

  constructor(
    private service: AdminDashboardReportedusersService,
    private router: Router,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchData();
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as 'tourist' | 'guide' | 'company' | 'admin';
  }

  fetchData(): void {
    this.isLoading = true;
    this.service.getReportedUsers().subscribe({
      next: (users: ReportedUser[]) => {
      this.reportedUsers = users;
      return this.service.getReportRequests().subscribe({
        next: (requests: ReportRequest[]) => {
        this.reportRequests = requests;
        this.isLoading = false;
        },
        error: (err: any) => {
        console.error('Error fetching report requests:', err);
        this.errorMessage = 'Failed to load report requests.';
        this.isLoading = false;
        }
      });
      },
      error: (err: any) => {
      console.error('Error fetching reported users:', err);
      this.errorMessage = 'Failed to load reported users.';
      this.isLoading = false;
      }
    });
  }
    getUrl(path: string): SafeResourceUrl {
    
    const generatedUrl =
      'http://localhost:8080/auth/files/Blogs/' +
      path.substring(
        path.lastIndexOf('\\') + 1
      );
    const imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      generatedUrl
    );
    return imageUrl;
  }

  viewReportDetails(report: ReportRequest): void {
    this.selectedReport = report;
    this.showReportModal = true;
  }

  viewPost(postId: number): void {
    this.isLoading = true;
    let blog : any;
    let postDetails : PostDetails;
    this.service.getPostDetails(postId).subscribe({
  next: (response) => {
      blog = response;
      this.selectedPost = {
      id: Number(blog.blogId),
      authorName: blog.username,
      content: blog.content,
      imageUrl: this.getUrl(blog.photo_path[0]),
      createdAt: new Date(blog.createdAt),
    };

  },
  error: (err) => console.log(err),
});
    this.showPostModal = true;
    this.isLoading = false;

  }

  approveReport(reportId: number): void {
    if (confirm('Are you sure you want to approve this report and take action against the user?')) {
      this.isLoading = true;
      this.service.approveReport(reportId).subscribe({
        next: () => {
          this.reportRequests = this.reportRequests.filter(r => r.id !== reportId);
          this.successMessage = 'Report approved and user action taken.';
          this.isLoading = false;
          this.closeModals();
          this.fetchData(); // Refresh data
        },
        error: (err) => {
          console.error('Error approving report:', err);
          this.errorMessage = 'Failed to approve report. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  rejectReport(reportId: number): void {
    if (confirm('Are you sure you want to reject this report?')) {
      this.isLoading = true;
      this.service.rejectReport(reportId).subscribe({
        next: () => {
          this.reportRequests = this.reportRequests.filter(r => r.id !== reportId);
          this.successMessage = 'Report rejected.';
          this.isLoading = false;
          this.closeModals();
        },
        error: (err) => {
          console.error('Error rejecting report:', err);
          this.errorMessage = 'Failed to reject report. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  suspendUser(userId: number): void {
    if (confirm('Are you sure you want to suspend this user?')) {
      this.isLoading = true;
      this.service.suspendUser(userId).subscribe({
        next: () => {
          this.successMessage = 'User suspended successfully.';
          this.isLoading = false;
          this.fetchData(); // Refresh data
        },
        error: (err) => {
          console.error('Error suspending user:', err);
          this.errorMessage = 'Failed to suspend user. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  unsuspendUser(userId: number): void {
    if (confirm('Are you sure you want to unsuspend this user?')) {
      this.isLoading = true;
      this.service.unsuspendUser(userId).subscribe({
        next: () => {
          this.successMessage = 'User unsuspended successfully.';
          this.isLoading = false;
          this.fetchData(); // Refresh data
        },
        error: (err) => {
          console.error('Error unsuspending user:', err);
          this.errorMessage = 'Failed to unsuspend user. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  closeModals(): void {
    this.showReportModal = false;
    this.showPostModal = false;
    this.selectedReport = null;
    this.selectedPost = null;
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  get filteredReportedUsers(): ReportedUser[] {
    let filtered = this.reportedUsers;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get filteredReportRequests(): ReportRequest[] {
    let filtered = this.reportRequests;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(request => 
        request.reportedUserName.toLowerCase().includes(term) || 
        request.reporterName.toLowerCase().includes(term) ||
        request.comment.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'active': return 'bg-success';
      case 'suspended': return 'bg-danger';
      case 'pending_review': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  getReportStatusBadgeClass(status: string): string {
    switch(status) {
      case 'approved': return 'bg-success';
      case 'rejected': return 'bg-danger';
      case 'pending': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getCurrentUser() {
    return {
      id: '123',
      type: 'admin',
    };
  }
}