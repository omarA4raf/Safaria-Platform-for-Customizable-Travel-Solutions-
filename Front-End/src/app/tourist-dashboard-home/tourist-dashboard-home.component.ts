import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from './tourist-dashboard-home.service';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// Remove this problematic import:
// import { console } from 'node:inspector';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-tourist-dashboard-home',
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    ChatComponent, // Make sure this is included
  ],
  standalone: true,
  templateUrl: './tourist-dashboard-home.component.html',
  styleUrls: ['./tourist-dashboard-home.component.css'],
})
export class TouristDashboardHomeComponent implements OnInit {
  UserType = UserType; // Makes the enum available in template

  trips: any[] = []; // Initialize as empty array

  userId = '123'; // Add this property
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Add this property

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Uncomment and use your authentication logic if needed
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== 'TOURIST'
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // Initialize user data - replace with your actual auth logic
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as 'tourist';

    console.log('Home component initialized with userId:', this.userId);

    //this.fetchData();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('navbar-shrink');
        } else {
          navbar?.classList.remove('navbar-shrink');
        }
      });
    }
  }

  fetchData(): void {
    this.apiService.getTrips().subscribe((data) => {
      this.trips = data;
      this.trips.forEach((trip) => {
        this.apiService.getTripImage(trip.tourID).subscribe((image) => {
          const imageUrl = URL.createObjectURL(image);
          trip.image = imageUrl;
        });
      });
    });
  }

  renderStars(rating: number): string {
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="bi bi-star-fill text-warning"></i> ';
    }
    if (halfStar) {
      starsHtml += '<i class="bi bi-star-half text-warning"></i> ';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="bi bi-star text-secondary"></i> ';
    }
    return starsHtml;
  }

  getCurrentUser() {
    return {
      id: '123', // Get from JWT or session
      type: 'tourist', // or 'guide', 'company', 'admin'
    };
  }

  // Add this method to check if user is logged in
  isLoggedIn(): boolean {
    // For now, return true. Replace with actual auth logic
    return true;
    // return this.authService.isLoggedIn();
  }

  // Add this method to get user ID
  getUserId(): string {
    return this.userId;
  }
}