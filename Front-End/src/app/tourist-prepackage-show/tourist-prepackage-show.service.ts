import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './tourist-prepackage-show.component'; // Add this import

@Injectable({
  providedIn: 'root'
})
export class TouristPrepackageShowService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  searchTrips(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tours/search?q=${encodeURIComponent(query)}`);
  }

  getTripImage(tripId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/tours/image/${tripId}`, { 
      responseType: 'blob' 
    });
  }

  searchTripsByCountry(country: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/tours/search?country=${encodeURIComponent(country)}`);
  }
}