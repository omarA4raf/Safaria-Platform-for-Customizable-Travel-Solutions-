import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TouristCustomizeTourThirdService {
  private apiUrl = 'http://localhost:8080/api';
  private _useFakeData = true;

  get useFakeData(): boolean {
    const stored = localStorage.getItem('useFakeData');
    return stored ? JSON.parse(stored) : this._useFakeData;
  }

  set useFakeData(value: boolean) {
    this._useFakeData = value;
    localStorage.setItem('useFakeData', JSON.stringify(value));
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  submitCustomTourSelections(selections: any): Observable<any> {
    if (this.useFakeData) {
      return of({
        success: true,
        message: 'Tour submitted successfully (fake data)',
        tourId: Math.floor(Math.random() * 1000),
        selections: selections
      }).pipe(delay(500));
    }

    if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
      throw new Error('Unauthorized access');
    }

    return this.http.post(
      `${this.apiUrl}/custom-tour/selections`,
      {
        ...selections,
        touristId: this.authService.getUserId()
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    );
  }
}