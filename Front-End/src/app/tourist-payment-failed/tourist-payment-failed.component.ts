import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-tourist-payment-failed',
  templateUrl: './tourist-payment-failed.component.html',
  styleUrls: ['./tourist-payment-failed.component.css'],
  standalone: true,
  imports: [ChatComponent],
})
export class TouristPaymentFailedComponent {

  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service
  errorMessage: string | null = null;

  constructor(private router: Router, public authService: AuthService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.errorMessage = state?.['error'] || null;
  }

  retryPayment() {
    this.router.navigate(['/home'], {
      state: history.state, // Preserve booking data
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/touristdashboardhome']);
  }

  ngOnInit(): void {
    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';
  }
  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }
}
