import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Request {
  id: number;
  name: string;
  email: string;
  type:'tourguide';
  documentUrl: string; // URL to PDF or image
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardTourguideRequestService {
  private apiUrl = 'http://localhost:8080/api';
  private fakeRequests: Request[] = [
    {
      id: 1,
      name: 'Adventure Tours Co.',
      email: 'contact@adventure.com',
      type: 'tourguide',
      documentUrl: '/assets/documents/business-license-1.pdf',
      status: 'pending',
      submittedAt: new Date('2025-03-15')
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@guide.com',
      type: 'tourguide',
      documentUrl: '/assets/documents/id-guide-1.jpg',
      status: 'pending',
      submittedAt: new Date('2025-03-20')
    },
    {
      id: 3,
      name: 'Luxury Travel LLC',
      email: 'info@luxurytravel.com',
      type: 'tourguide',
      documentUrl: '/assets/documents/business-license-2.pdf',
      status: 'pending',
      submittedAt: new Date('2025-04-01')
    }
  ];

  private useFakeData = true;

  constructor(private http: HttpClient) {}

  getRequests(): Observable<Request[]> {
    if (this.useFakeData) {
      return of([...this.fakeRequests]).pipe(delay(500));
    }
    return this.http.get<Request[]>(`${this.apiUrl}/requests`);
  }

  approveRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      const request = this.fakeRequests.find(r => r.id === id);
      if (request) {
        request.status = 'approved';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.put<void>(`${this.apiUrl}/requests/${id}/approve`, {});
  }

  rejectRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      const request = this.fakeRequests.find(r => r.id === id);
      if (request) {
        request.status = 'rejected';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.put<void>(`${this.apiUrl}/requests/${id}/reject`, {});
  }

  deleteRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      this.fakeRequests = this.fakeRequests.filter(r => r.id !== id);
      return of(undefined).pipe(delay(500));
    }
    return this.http.delete<void>(`${this.apiUrl}/requests/${id}`);
  }
}