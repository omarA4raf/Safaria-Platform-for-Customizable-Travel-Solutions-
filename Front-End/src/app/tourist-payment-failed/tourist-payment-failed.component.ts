import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-payment-failed',
  templateUrl: './tourist-payment-failed.component.html',
  styleUrls: ['./tourist-payment-failed.component.css']
})
export class TouristPaymentFailedComponent {
  errorMessage: string | null = null;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.errorMessage = state?.['error'] || null;
  }

  retryPayment() {
    this.router.navigate(['/touristpaytripcomponent'], {
      state: history.state // Preserve booking data
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/touristdashboardhome']);
  }
}