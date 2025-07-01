import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/api/integration/api/stripe';

  constructor(private http: HttpClient) {}

  getPaymentDetails(): Promise<any> {
    return this.http
      .get<any>(`${this.baseUrl}/payment-details`)
      .toPromise()
      .then((res) => {
        if (res) {
          return res;
        } else {
          throw new Error('Invalid payment details response');
        }
      });
  }

  createPaymentIntent(
    amount: number,
    currency: string,
    description: string,
    userId: string
  ): Promise<string> {
    const payload = {
      amount,
      currency,
      description,
      userId,
    };

    return this.http
      .post<{ clientSecret?: string }>(
        `${this.baseUrl}/create-payment-intent`,
        payload
      )
      .toPromise()
      .then((res) => {
        if (res?.clientSecret) {
          return res.clientSecret;
        } else {
          throw new Error('Client secret is missing from the response');
        }
      });
  }
}