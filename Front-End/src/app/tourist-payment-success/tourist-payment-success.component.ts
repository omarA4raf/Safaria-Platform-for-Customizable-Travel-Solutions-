import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tourist-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tourist-payment-success.component.html',
  styleUrls: ['./tourist-payment-success.component.css']
})
export class TouristPaymentSuccessComponent {
  bookingDetails: any;
  tripDetails: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.tripDetails = navigation.extras.state['trip'];
      this.bookingDetails = navigation.extras.state['bookingDetails'];
    } else {
      const state = history.state;
      if (state && state.trip) {
        this.tripDetails = state.trip;
        this.bookingDetails = state.bookingDetails;
      } else {
        this.navigateToDashboard();
      }
    }
  }

  // Add this public method
  navigateToDashboard() {
    // this.router.navigate(['/touristdashboardhome']);
  }
}