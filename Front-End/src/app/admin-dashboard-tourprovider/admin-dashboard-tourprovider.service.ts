import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface TourProviderRequest {
  id: number;
  name: string;
  email: string;
  type: 'company' | 'tourguide';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardTourproviderService {
  private apiUrl = 'http://localhost:8080/api';
  private fakeRequests: TourProviderRequest[] = [
    {
      id: 1,
      name: 'Adventure Tours Co.',
      email: 'contact@adventure.com',
      type: 'company',
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
      type: 'company',
      documentUrl: '/assets/documents/business-license-2.pdf',
      status: 'pending',
      submittedAt: new Date('2025-04-01')
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.j@guides.com',
      type: 'tourguide',
      documentUrl: '/assets/documents/id-guide-2.pdf',
      status: 'pending',
      submittedAt: new Date('2025-04-05')
    }
  ];

  private useFakeData = true;

  constructor(private http: HttpClient) {}

  getRequests(): Observable<TourProviderRequest[]> {
    if (this.useFakeData) {
      return of([...this.fakeRequests]).pipe(delay(500));
    }
    return this.http.get<TourProviderRequest[]>(`${this.apiUrl}/tour-providers/requests`);
  }

  approveRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      const request = this.fakeRequests.find(r => r.id === id);
      if (request) {
        request.status = 'approved';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.put<void>(`${this.apiUrl}/tour-providers/${id}/approve`, {});
  }

  rejectRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      this.fakeRequests = this.fakeRequests.filter(r => r.id !== id);
      return of(undefined).pipe(delay(500));
    }
    return this.http.delete<void>(`${this.apiUrl}/tour-providers/${id}/reject`);
  }

  deleteRequest(id: number): Observable<void> {
    if (this.useFakeData) {
      this.fakeRequests = this.fakeRequests.filter(r => r.id !== id);
      return of(undefined).pipe(delay(500));
    }
    return this.http.delete<void>(`${this.apiUrl}/tour-providers/${id}`);
  }
}