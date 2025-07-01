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

  getTripImage(tripId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/tours/image/${tripId}`, { 
      responseType: 'blob' 
    });
  }

  // Use the controller's /country/{country}?offset=0&size=8 endpoint
  searchTripsByCountry(country: string, offset: number, size: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}/tours/country/${encodeURIComponent(country)}?offset=${offset}&size=${size}`
    );
  }
}