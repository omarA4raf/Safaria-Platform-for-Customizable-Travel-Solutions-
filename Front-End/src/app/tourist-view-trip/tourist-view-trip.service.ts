import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trip, AvailableDate } from './tourist-view-trip.component';

@Injectable({
  providedIn: 'root',
})
export class TouristViewTripService {
  private apiUrl = 'http://localhost:8080/api';
  private useFakeData = false; // Set to false to use real API

  constructor(private http: HttpClient) {}

  getTripById(id: number): Observable<Trip> {
    // Always use real API now
    return this.http.get<Trip>(`${this.apiUrl}/tours/${id}`);
  }

  public getFakeTripData(): Trip {
    return {
      id: 1,
      title: 'Amazing Egyptian Adventure',
      images: [
        '../assets/img/pexels-qibili-18291196.jpg',
        '../assets/img/pexels-thorsten-technoman-109353-338504.jpg',
        '../assets/img/boats-3932034_1280.jpg',
        '../assets/img/pexels-pixabay-271639.jpg',
        '../assets/img/pexels-chanwalrus-958545.jpg',
        '../assets/img/pexels-pixabay-262978.jpg',
      ],
      destinationCountry: 'Egypt',
      tourismTypes: ['Cultural', 'Historical', 'Adventure'],
      duration: 7,
      providerName: 'Desert Adventures Co.', // 👈 Add provider
      availableDates: [
        {
          startDate: new Date('2024-06-15'),
          endDate: new Date('2024-06-22'),
          availableSeats: 12,
          budget: 200,
        },
        {
          startDate: new Date('2024-07-15'),
          endDate: new Date('2024-07-22'),
          availableSeats: 9,
          budget: 1000,
        },
        {
          startDate: new Date('2024-08-15'),
          endDate: new Date('2024-08-22'),
          availableSeats: 20,
          budget: 800,
        },
      ],
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam sed ratione nobis deleniti minima assumenda quod quisquam animi omnis nostrum harum soluta dolorem unde incidunt, maiores nihil beatae. Consequuntur ipsum vel suscipit sunt, unde natus nihil architecto alias esse libero tenetur rerum ut culpa delectus? Illo nemo repellat voluptatum maiores dignissimos? Repellendus quaerat ipsam impedit itaque voluptate, illo excepturi facere corrupti neque praesentium nostrum non, magnam ad ipsa vitae veritatis? Sequi dolores ducimus omnis, cumque ea facere magni fuga mollitia pariatur non doloremque molestias consequuntur! Recusandae quidem iste nam fugiat doloribus amet ipsa, mollitia placeat quas, provident sit quibusdam obcaecati.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam sed ratione nobis deleniti minima assumenda quod quisquam animi omnis nostrum harum soluta dolorem unde incidunt, maiores nihil beatae. Consequuntur ipsum vel suscipit sunt, unde natus nihil architecto alias esse libero tenetur rerum ut culpa delectus? Illo nemo repellat voluptatum maiores dignissimos? Repellendus quaerat ipsam impedit itaque voluptate, illo excepturi facere corrupti neque praesentium nostrum non, magnam ad ipsa vitae veritatis? Sequi dolores ducimus omnis, cumque ea facere magni fuga mollitia pariatur non doloremque molestias consequuntur! Recusandae quidem iste nam fugiat doloribus amet ipsa, mollitia placeat quas, provident sit quibusdam obcaecati.',
      freeCancellationDeadline: 30,
      currency: 'USD',
      rating: 4.7,
      // price: 1200,
    };
  }

  getTripDate(tripId: number, dateIndex: number): Observable<AvailableDate> {
    if (this.useFakeData) {
      const trip = this.getFakeTripData();
      return of(trip.availableDates[dateIndex]);
    } else {
      return this.http.get<AvailableDate>(
        `${this.apiUrl}/tours/${tripId}/dates/${dateIndex}`
      );
    }
  }
  // In tourist-prepackage-see-tour.service.ts
  getTripImage(tripId: number): Observable<Blob> {
    if (this.useFakeData) {
      // Create a mock blob (you might want to use a real image)
      return of(new Blob());
    } else {
      return this.http.get(`${this.apiUrl}/tours/${tripId}/image`, {
        responseType: 'blob',
      });
    }
  }
}
