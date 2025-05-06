import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { delay as rxjsDelay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TouristCustomizeTourFirsService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCustomTourOptions(requestData: any): Observable<any> {
    // Temporary bypass for testing
    return of({
      destination: requestData.destination,
      duration: requestData.duration,
      tourismTypes: requestData.tourismTypes,
      samplePlaces: ['Place A', 'Place B', 'Place C']
    }).pipe(rxjsDelay(500)); // Simulate API delay
    
    // Actual implementation (commented out)
    /*
    return this.http.post(`${this.apiUrl}/custom-tour-options`, {
      ...requestData,
      touristId: 'temp-user-id'
    });
    */
  }
}

function delay(milliseconds: number): any {
  return rxjsDelay(milliseconds);
}

