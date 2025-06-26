import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouristViewTripService } from '../tourist-view-trip/tourist-view-trip.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-tourist-pay-trip',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tourist-pay-trip.component.html',
  styleUrls: ['./tourist-pay-trip.component.css'],
})
export class TouristPayTripComponent implements OnInit {
  tripDetails: any = {};
  selectedDate: any = {};
  memberCount: number = 1;
  totalPrice: number = 0;
  isLoading: boolean = true;
  paymentProcessing: boolean = false;
  cardError: string = '';

  // Form fields
  nameOnCard: string = '';
  email: string = '';
  phone: string = '';
  billingAddress: string = '';

  // Stripe elements
  stripe: any;
  cardElement: any;

  constructor(
    private router: Router,
    private tripService: TouristViewTripService
  ) {}

  async ngOnInit() {
    // Uncomment and use your authentication logic if needed
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== 'TOURIST'
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // Load trip data first
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.tripDetails =
        navigation.extras.state['tripDetails'] || this.getDefaultTripData();
      this.selectedDate =
        navigation.extras.state['selectedDate'] ||
        this.tripDetails.availableDates[0];
      this.memberCount = navigation.extras.state['memberCount'] || 1;
      this.totalPrice = this.selectedDate.budget * this.memberCount;
    } else {
      this.loadDefaultData();
    }

    // Then initialize Stripe after the view is ready
    setTimeout(() => {
      this.initializeStripe();
    });
    this.isLoading = false;
  }

  private async initializeStripe() {
    try {
      this.stripe = await loadStripe(
        'pk_test_51ReJu32e42PsnFjzo0B1k82I1V1YAVcy2VmbkCIupoH7eM0cFjkdzQ2LPvXbnLIHvt1hjDhWS3Fin343KPOGf6AW00KrteLbcO'
      );
      if (!this.stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const elements = this.stripe.elements();
      this.cardElement = elements.create('card', {
        style: {
          base: {
            color: '#040A15',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
      });

      // Check if the element exists before mounting
      const cardElement = document.getElementById('card-element');
      if (cardElement) {
        this.cardElement.mount('#card-element');
      } else {
        throw new Error('Card element container not found');
      }

      this.cardElement.on('change', (event: any) => {
        this.cardError = event.error?.message || '';
      });
    } catch (error) {
      console.error('Stripe initialization error:', error);
      this.isLoading = false;
      this.cardError = 'Payment system unavailable. Please try again later.';
    }
  }

  private loadDefaultData() {
    this.tripDetails = this.getDefaultTripData();
    this.selectedDate = this.tripDetails.availableDates[0];
    this.totalPrice = this.selectedDate.budget * this.memberCount;
  }

  private getDefaultTripData(): any {
    return {
      id: 1,
      title: 'Amazing Egyptian Adventure',
      images: ['assets/default-trip.jpg'],
      destinationCountry: 'Egypt',
      tourismTypes: ['Cultural', 'Historical'],
      duration: 7,
      availableDates: [
        {
          startDate: new Date('2024-06-15'),
          endDate: new Date('2024-06-22'),
          availableSeats: 12,
          budget: 200,
        },
      ],
      description: 'Default trip description',
      freeCancellationDeadline: 30,
      currency: 'USD',
      rating: 4.5,
      price: 1200,
    };
  }

  async handlePayment() {
    if (this.paymentProcessing) return;

    this.paymentProcessing = true;
    this.cardError = '';

    try {
      // Validate card details
      const { error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
        billing_details: {
          name: this.nameOnCard,
          email: this.email,
          phone: this.phone,
          address: {
            line1: this.billingAddress,
          },
        },
      });

      if (error) {
        throw error;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page
      this.router.navigate(['/touristpaymentsuccesscomponent'], {
        state: {
          trip: this.tripDetails,
          bookingDetails: {
            date: this.selectedDate,
            memberCount: this.memberCount,
            totalPrice: this.totalPrice,
            bookingReference:
              'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          },
        },
      });
    } catch (error: any) {
      this.router.navigate(['/touristpaymentfailed'], {
        state: {
          error: error.message,
          trip: this.tripDetails,
          bookingDetails: {
            date: this.selectedDate,
            memberCount: this.memberCount,
            totalPrice: this.totalPrice,
            bookingReference:
              'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          },
        },
      });
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  }
}
