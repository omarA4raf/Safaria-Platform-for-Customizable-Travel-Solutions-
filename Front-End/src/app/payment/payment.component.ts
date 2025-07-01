// src/app/payment/payment.component.ts
declare var Stripe: any;

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentData = {
    amount: 1000,
    currency: 'usd',
    paymentMethodType: 'card'
  };

  stripe: any;
  cardElement: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.stripe = Stripe('pk_test_51RJFWZQYWrXnkmwFsPc8eRwKfiHr6FxmvMMjSMJZXeq1DxhZGgCUuh0TKp7efcctwLWAImCPKcd9bF5v68Iy310300fsDF1QwA'); // ← replace this
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  makePayment() {
    this.http.post<any>('http://localhost:8080/api/integration/api/stripe/create-payment-intent', this.paymentData)
      .subscribe({
        next: async (res) => {
          const clientSecret = res.clientSecret;
          console.log('Client secret:', clientSecret);
          const result = await this.stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.cardElement
            }
          });

          if (result.error) {
            console.error('Payment confirmation error:', result.error);
            alert('Payment failed: ' + result.error.message);
          } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
          } else {
            console.warn('Unhandled payment status:', result.paymentIntent?.status);
          }
        },
        error: (err) => {
          console.error('Payment intent creation error:', err);
          alert('Error creating payment intent');
        }
      });
  }
}
