import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourguideDashboardService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserId: string | null = null;

  constructor(private http: HttpClient) {}

  setUserId(userId: string): void {
    this.currentUserId = userId;
  }

  // Fetch Name
  getName(): Observable<any> {
    if (!this.currentUserId) {
      throw new Error('User ID not set');
    }
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/name`, formData);
  }

  // Fetch Email
  getEmail(): Observable<any> {
    if (!this.currentUserId) {
      throw new Error('User ID not set');
    }
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/email`, formData);
  }

  // Fetch Country
  getCountry(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/country`, formData);
  }

  // Fetch Phone Number
  getPhoneNumber(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/phone`, formData);
  }

  // Fetch Password
  getPassword(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/password`, formData);
  }

  // Fetch Tourism types
  getTourismTypes(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post('/api/tourismTypes', formData);
  }

  // Fetch Rating
  getRating(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/rating`, formData);
  }

  // Fetch About Me
  getAbout(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/about`, formData);
  }

  // Fetch Trips
  getTrips(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/trips`, formData);
  }

  // Fetch Clients
  getClients(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/clients`, formData);
  }

  // Fetch Client Reviews
  getClientReviews(): Observable<any> {
    const formData = new FormData();
    formData.append('key', 'value'); // Add any necessary data to the FormData object
    return this.http.post(`${this.apiUrl}/client-reviews`, formData);
  }

  // Upload Profile Image
  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-profile-image`, formData);
  }
}