import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  // Get complete company profile
  getCompanyProfile(companyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${companyId}/profile`);
  }

  // Update company profile
  updateCompanyProfile(companyId: string, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${companyId}/profile`, profileData);
  }

  // Get specific profile fields
  getName(companyId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${companyId}/name`, {
      responseType: 'text',
    });
  }

  getEmail(companyId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${companyId}/email`, {
      responseType: 'text',
    });
  }

  getCountry(companyId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${companyId}/country`, {
      responseType: 'text',
    });
  }

  getPhoneNumber(companyId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${companyId}/phone`, {
      responseType: 'text',
    });
  }

  // Tourism types operations
  getTourismTypes(companyId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${companyId}/tourism-types`);
  }

  updateTourismTypes(companyId: string, types: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/${companyId}/tourism-types`, {
      types,
    });
  }

  // Rating operations
  getRating(companyId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${companyId}/rating`);
  }

  // About section operations
  getAbout(companyId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${companyId}/about`, {
      responseType: 'text',
    });
  }

  updateAbout(companyId: string, aboutText: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${companyId}/about`, {
      about: aboutText,
    });
  }

  // Trips operations
  getTrips(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/trips`);
  }

  getUpcomingTrips(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/trips/upcoming`);
  }

  getPastTrips(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/trips/past`);
  }

  // Clients operations
  getClients(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/clients`);
  }

  getActiveClients(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/clients/active`);
  }

  // Reviews operations
  getClientReviews(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${companyId}/reviews`);
  }

  getRecentReviews(companyId: string, limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${companyId}/reviews/recent?limit=${limit}`
    );
  }

  // Profile image operations
  uploadProfileImage(
    companyId: string,
    imageFile: File
  ): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/${companyId}/profile-image`,
      formData
    );
  }

  deleteProfileImage(companyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${companyId}/profile-image`);
  }

  // Password operations (handled separately for security)
  changePassword(
    companyId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${companyId}/change-password`, {
      currentPassword,
      newPassword,
    });
  }
}
