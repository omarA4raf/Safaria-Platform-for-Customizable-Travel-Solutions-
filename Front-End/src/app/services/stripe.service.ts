import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private card: StripeCardElement | null = null;

  constructor() {
    this.stripePromise = loadStripe('your-publishable-key-here');
  }

  async initialize() {
    this.stripe = await this.stripePromise;
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async createPaymentMethod(): Promise<string | undefined> {
    if (!this.stripe || !this.card) return;

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      console.error(error);
      return undefined;
    }

    return paymentMethod.id;
  }
}