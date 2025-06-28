import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  selector: 'app-tourist-payment-success',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './tourist-payment-success.component.html',
  styleUrls: ['./tourist-payment-success.component.css'],
})
export class TouristPaymentSuccessComponent {
  bookingDetails: any;
  tripDetails: any;

  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service

  constructor(private router: Router, public authService: AuthService) {
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
