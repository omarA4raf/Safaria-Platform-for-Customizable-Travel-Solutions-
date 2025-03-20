import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardService {
  private apiUrl = 'https://your-backend-api.com'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch Name
  getName(): Observable<any> {
    return this.http.get(`${this.apiUrl}/name`);
  }

  // Fetch Email
  getEmail(): Observable<any> {
    return this.http.get(`${this.apiUrl}/email`);
  }

  // Fetch Country
  getCountry(): Observable<any> {
    return this.http.get(`${this.apiUrl}/country`);
  }

  // Fetch Phone Number
  getPhoneNumber(): Observable<any> {
    return this.http.get(`${this.apiUrl}/phone`);
  }

  // Fetch Password
  getPassword(): Observable<any> {
    return this.http.get(`${this.apiUrl}/password`);
  }

  // Fetch Tourism types
  getTourismTypes(): Observable<any> {
    return this.http.get('/api/tourismTypes');
  }

  // Fetch Rating
  getRating(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rating`);
  }

  // Fetch About Me (optional)
  getAbout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/about`);
  }

  // Fetch Trips (optional)
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trips`);
  }

  // Fetch Clients (optional)
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Fetch Client Reviews (optional)
  getClientReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client-reviews`);
  }
}
