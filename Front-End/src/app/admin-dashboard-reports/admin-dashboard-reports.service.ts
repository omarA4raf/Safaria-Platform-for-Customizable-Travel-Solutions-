// admin-dashboard-reportedusers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  imageUrl?: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardReportedusersService {
  private apiUrl = 'http://localhost:8080/auth/admin';
  private useFakeData = true;

  private fakeReportedUsers: ReportedUser[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      type: 'tourist',
      reportCount: 3,
      status: 'active',
      lastReportedAt: new Date('2025-05-10')
    },
    {
      id: 2,
      name: 'Adventure Co.',
      email: 'contact@adventure.com',
      type: 'company',
      reportCount: 5,
      status: 'suspended',
      lastReportedAt: new Date('2025-05-15')
    },
    {
      id: 3,
      name: 'Sarah Guide',
      email: 'sarah@guide.com',
      type: 'guide',
      reportCount: 2,
      status: 'pending_review',
      lastReportedAt: new Date('2025-05-18')
    }
  ];

  private fakeReportRequests: ReportRequest[] = [
    {
      id: 1,
      reporterId: 10,
      reporterName: 'User A',
      reportedUserId: 1,
      reportedUserName: 'John Doe',
      postId: 101,
      comment: 'This user posted inappropriate content in the forum.',
      status: 'pending',
      createdAt: new Date('2025-05-10')
    },
    {
      id: 2,
      reporterId: 11,
      reporterName: 'User B',
      reportedUserId: 2,
      reportedUserName: 'Adventure Co.',
      comment: 'This company has been sending spam messages to users.',
      status: 'pending',
      createdAt: new Date('2025-05-12')
    },
    {
      id: 3,
      reporterId: 12,
      reporterName: 'User C',
      reportedUserId: 3,
      reportedUserName: 'Sarah Guide',
      postId: 102,
      comment: 'The guide was rude during our tour and provided false information.',
      status: 'pending',
      createdAt: new Date('2025-05-15')
    }
  ];

  private fakePosts: PostDetails[] = [
    {
      id: 101,
      authorName: 'John Doe',
      content: 'Check out this amazing place I visited last week! The scenery was breathtaking.',
      imageUrl: '/assets/images/sample-post-1.jpg',
      createdAt: new Date('2025-05-08')
    },
    {
      id: 102,
      authorName: 'Sarah Guide',
      content: 'Join my tour next weekend for a special discount! Limited spots available.',
      createdAt: new Date('2025-05-14')
    }
  ];

  constructor(private http: HttpClient) {}

  getReportedUsers(): Observable<ReportedUser[]> {
    if (this.useFakeData) {
      return of([...this.fakeReportedUsers]).pipe(delay(500));
    }
    return this.http.get<ReportedUser[]>(`${this.apiUrl}/reported-users`);
  }

  getReportRequests(): Observable<ReportRequest[]> {
    if (this.useFakeData) {
      return of([...this.fakeReportRequests]).pipe(delay(500));
    }
    return this.http.get<ReportRequest[]>(`${this.apiUrl}/report-requests`);
  }

  getPostDetails(postId: number): Observable<PostDetails> {
    if (this.useFakeData) {
      const post = this.fakePosts.find(p => p.id === postId);
      return of(post ? {...post} : {
        id: postId,
        authorName: 'Unknown',
        content: 'Post content not available',
        createdAt: new Date()
      }).pipe(delay(300));
    }
    return this.http.get<PostDetails>(`${this.apiUrl}/posts/${postId}`);
  }

  approveReport(reportId: number): Observable<any> {
    if (this.useFakeData) {
      const report = this.fakeReportRequests.find(r => r.id === reportId);
      if (report) {
        report.status = 'approved';
        // Update the reported user status
        const user = this.fakeReportedUsers.find(u => u.id === report.reportedUserId);
        if (user) {
          user.status = 'suspended';
          user.reportCount += 1;
          user.lastReportedAt = new Date();
        }
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/reports/${reportId}/approve`, null);
  }

  rejectReport(reportId: number): Observable<any> {
    if (this.useFakeData) {
      const report = this.fakeReportRequests.find(r => r.id === reportId);
      if (report) {
        report.status = 'rejected';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/reports/${reportId}/reject`, null);
  }

  suspendUser(userId: number): Observable<any> {
    if (this.useFakeData) {
      const user = this.fakeReportedUsers.find(u => u.id === userId);
      if (user) {
        user.status = 'suspended';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/users/${userId}/suspend`, null);
  }

  unsuspendUser(userId: number): Observable<any> {
    if (this.useFakeData) {
      const user = this.fakeReportedUsers.find(u => u.id === userId);
      if (user) {
        user.status = 'active';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/users/${userId}/unsuspend`, null);
  }
}