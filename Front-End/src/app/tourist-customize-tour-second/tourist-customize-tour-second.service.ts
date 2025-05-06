import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TouristCustomizeTourSecondService {
  private apiUrl = 'http://localhost:8080/api';
  private useFakeData = true; // Switch to false for real API

  getUseFakeData(): boolean {
    return this.useFakeData;
  }

  // Add this new method to generate fake itinerary
  private generateFakeItinerary(selections: any): any[] {
    const days = selections.duration || 3; // Default to 3 days if duration not provided
    const itinerary = [];

    // Sample activities for each day
    const sampleActivities = [
      { time: '09:00', type: 'Breakfast' },
      { time: '10:00', type: 'Sightseeing' },
      { time: '12:00', type: 'Lunch' },
      { time: '14:00', type: 'Cultural Activity' },
      { time: '18:00', type: 'Dinner' },
    ];

    for (let i = 1; i <= days; i++) {
      const dayItinerary = {
        day: i,
        activities: sampleActivities.map((activity) => ({
          ...activity,
          description: `${activity.type} at ${this.getRandomLocation()}`,
        })),
      };
      itinerary.push(dayItinerary);
    }

    return itinerary;
  }

  // Helper method for fake locations
  private getRandomLocation(): string {
    const locations = [
      'City Center',
      'Downtown',
      'Main Square',
      'Historic District',
      'Waterfront'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTourOptions(): Observable<any> {
    if (this.useFakeData) {
      // Return fake data immediately for development
      return of({
        hotels: [],
        restaurants: [],
        places: [],
      });
    }

    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== 'TOURIST'
    ) {
      // Instead of throwing error, return empty data
      return of({
        hotels: [],
        restaurants: [],
        places: [],
      });
    }

    return this.http
      .get(`${this.apiUrl}/tour-options`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error('API Error, using empty data', error);
          return of({
            hotels: [],
            restaurants: [],
            places: [],
          });
        })
      );
  }

  submitCustomTourSelections(selections: any): Observable<any> {
    // =============================================
    // FAKE DATA IMPLEMENTATION (comment this block for real API)
    // =============================================
    if (this.useFakeData) {
      const fakeResponse = {
        success: true,
        message: 'Tour submitted successfully (demo)',
        tourId: Math.floor(Math.random() * 10000),
        selections: selections,
        itinerary: this.generateFakeItinerary(selections),
      };
      return of(fakeResponse).pipe(delay(800)); // Simulate network delay
    }
    // =============================================
    // END OF FAKE DATA BLOCK
    // =============================================

    // =============================================
    // REAL API IMPLEMENTATION (uncomment this block for real API)
    // =============================================
    /*
    if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
      throw new Error('Unauthorized access - Tourist privileges required');
    }

    const requestData = {
      ...selections,
      touristId: this.authService.getUserId()
    };

    return this.http.post(`${this.apiUrl}/custom-tour/selections`, requestData, {
      headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    });
    */
    // =============================================
    // END OF REAL API BLOCK
    // =============================================

    // Default return to satisfy all code paths
    return of({ success: false, message: 'No operation performed' });
  }

  // (Keep your existing helper methods)
}

function delay<T>(milliseconds: number): import('rxjs').OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    new Observable<T>((observer) => {
      const subscription = source.subscribe({
        next(value) {
          setTimeout(() => observer.next(value), milliseconds);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          setTimeout(() => observer.complete(), milliseconds);
        },
      });

      return () => subscription.unsubscribe();
    });
}
