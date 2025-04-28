import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class TourguideCreateTripService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Method to create a new trip
  createTrip(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/tours/create`, formData);
  }

  // Method to save a trip as a draft
  saveDraft(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/draftTrips`, formData);
  }
}
 
 