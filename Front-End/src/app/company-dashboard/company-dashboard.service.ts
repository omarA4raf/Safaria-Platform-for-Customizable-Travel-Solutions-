import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardService {
  private apiUrl = 'https://your-backend-api.com'; // Replace with your backend API URL
  
  constructor(@Inject(HttpClient) private http: HttpClient) {}
  
  // Fetch profile data
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Fetch about CV data
  getAbout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/about`);
  }

  // Fetch trips data
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trips`);
  }

  // Fetch clients data
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Fetch client reviews data
  getClientReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client-reviews`);
  }
}
