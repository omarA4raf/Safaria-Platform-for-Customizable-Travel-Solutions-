import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  getTripImage(tripID:any): Observable<Blob> {
   
    return  this.http.get(`${this.apiUrl}/tours/image/${tripID}`, { responseType: 'blob' });
    
  }
  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tours/important`);
  }
}