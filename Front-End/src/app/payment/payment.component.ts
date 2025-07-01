import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatComponent } from '../shared/chat/chat.component';

export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}
declare var Stripe: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  userId: string = '';
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist';
  errorMessage: string | null = null;

  paymentData = {
    amount: 0,
    currency: '',
    paymentMethodType: 'card',
    description: '',
  };

  stripe: any;
  cardElement: any;
  stripeLoaded = false;
  paymentProcessing = false;
  cardError = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== UserType.TOURIST
    ) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.userId = this.authService.getUserId() || '';
    this.userType = this.authService.getUserType() as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';

    await this.fetchPaymentData();
    await this.loadStripeScript();
  }

  async fetchPaymentData() {
    try {
      const response = await this.http
        .get<any>(
          'http://localhost:8080/api/integration/api/stripe/payment-details'
        )
        .toPromise();

      if (response) {
        this.paymentData = {
          amount: response.amount || 0,
          currency: response.currency || 'usd',
          paymentMethodType: 'card',
          description: response.description || '',
        };
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
      this.errorMessage = 'Failed to load payment details';
      this.paymentData = {
        amount: 1000,
        currency: 'usd',
        paymentMethodType: 'card',
        description: 'Tour Package Payment',
      };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeStripe();
    }, 100);
  }

  ngOnDestroy() {
    if (this.cardElement) {
      try {
        this.cardElement.destroy();
      } catch (error) {
        console.log('Error destroying card element:', error);
      }
    }
  }

  private async loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof Stripe !== 'undefined') {
        this.stripeLoaded = true;
        this.cdr.detectChanges();
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        this.stripeLoaded = true;
        this.cdr.detectChanges();
        resolve();
      };
      script.onerror = () => {
        this.cardError = 'Failed to load payment system';
        this.cdr.detectChanges();
        reject(new Error('Failed to load Stripe'));
      };
      document.head.appendChild(script);
    });
  }

  private initializeStripe() {
    if (!this.stripeLoaded || typeof Stripe === 'undefined') {
      setTimeout(() => this.initializeStripe(), 100);
      return;
    }

    try {
      this.stripe = Stripe(
        'pk_test_51RJFWZQYWrXnkmwFsPc8eRwKfiHr6FxmvMMjSMJZXeq1DxhZGgCUuh0TKp7efcctwLWAImCPKcd9bF5v68Iy310300fsDF1QwA'
      );

      const elements = this.stripe.elements();
      this.cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
            iconColor: '#9e2146',
          },
        },
        hidePostalCode: true,
      });

      this.cardElement.mount('#card-element');

      this.cardElement.on('change', (event: any) => {
        if (event.error) {
          this.cardError = event.error.message;
        } else {
          this.cardError = '';
        }
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      this.cardError = 'Failed to initialize payment form';
      this.cdr.detectChanges();
    }
  }

  async makePayment() {
    if (this.paymentProcessing) return;
    if (!this.stripe || !this.cardElement) {
      this.cardError = 'Payment system not ready';
      return;
    }

    this.paymentProcessing = true;
    this.cardError = '';
    this.cdr.detectChanges();

    try {
      const response = await this.http
        .post<any>(
          'http://localhost:8080/api/integration/api/stripe/create-payment-intent',
          {
            amount: this.paymentData.amount,
            currency: this.paymentData.currency,
            description: this.paymentData.description,
            userId: this.userId,
          }
        )
        .toPromise();

      if (!response?.clientSecret) {
        throw new Error('Invalid response from payment server');
      }

      const result = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: this.authService.getUserId() || 'Customer',
          },
        },
      });

      if (result.error) {
        this.cardError = result.error.message || 'Payment failed';
        this.router.navigate(['/touristpaymentfailedcomponent']);
      } else if (result.paymentIntent?.status === 'succeeded') {
        this.router.navigate(['/touristpaymentsuccesscomponent'], {
          state: {
            paymentData: this.paymentData,
            paymentIntent: result.paymentIntent,
          },
        });
      } else {
        this.cardError = 'Payment status unclear';
        this.router.navigate(['/touristpaymentfailedcomponent']);
      }
    } catch (error) {
      console.error('Payment error:', error);
      this.cardError = 'Error processing payment';
      this.router.navigate(['/touristpaymentfailedcomponent']);
    } finally {
      this.paymentProcessing = false;
      this.cdr.detectChanges();
    }
  }
}