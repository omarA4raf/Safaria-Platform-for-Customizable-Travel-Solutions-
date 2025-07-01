import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/api/integration/api/stripe';

  constructor(private http: HttpClient) {}

  createPaymentIntent(): Promise<string> {
    const payload = {
      amount: 1000,
      currency: 'usd'
    };

    return this.http.post<{ clientSecret?: string }>(
      `${this.baseUrl}/create-payment-intent`,
      payload
    )
    .toPromise()
    .then(res => {
      if (res?.clientSecret) {
        return res.clientSecret;
      } else {
        throw new Error('Client secret is missing from the response');
      }
    });
  }

}
