import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouristPayTripService {
  private apiUrl = 'http://localhost:8080/api/payments'; // Your backend API endpoint

  constructor(private http: HttpClient) { }

  createPaymentIntent(tripId: number, dateIndex: number, memberCount: number, totalPrice: number): Observable<any> {
    // In a real app, you would call your backend here
    // For now, return mock data
    return of({
      clientSecret: 'mock_client_secret_' + Math.random().toString(36).substr(2, 10),
      paymentIntentId: 'pi_mock_' + Math.random().toString(36).substr(2, 10)
    });
    
    // Real implementation would be:
    // return this.http.post(`${this.apiUrl}/create-payment-intent`, {
    //   tripId,
    //   dateIndex,
    //   memberCount,
    //   totalPrice
    // });
  }

  confirmPayment(paymentMethodId: string, paymentIntentId: string): Observable<any> {
    // In a real app, you would call your backend here
    // For now, return mock data
    return of({
      success: true,
      bookingReference: 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    });
    
    // Real implementation would be:
    // return this.http.post(`${this.apiUrl}/confirm-payment`, {
    //   paymentMethodId,
    //   paymentIntentId
    // });
  }
}