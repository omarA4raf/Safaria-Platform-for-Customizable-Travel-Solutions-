import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core'; // <-- Add 'Inject' here
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TouristPrepackageShowService } from './tourist-prepackage-show.service';
import { AuthService } from '../services/auth.service'; // Add this import
import { CurrencyFormatPipe } from '../currency.pipe'; // Import the CurrencyFormatPipe
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}
export interface Trip {
  tourID: number;
  title: string;
  image: string;
  tourProviderName: string;
  rating: number;
  destinationCountry: string;
  priceAmount: number;
  priceCurrency: string; // 'USD', 'EUR', 'GBP', etc.
  
  duration?: string;
}

@Component({
  selector: 'app-tourist-prepackage-show',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    CurrencyFormatPipe,
    ChatComponent,
  ],
  templateUrl: './tourist-prepackage-show.component.html',
  styleUrls: ['./tourist-prepackage-show.component.css'],
})
export class TouristPrepackageShowComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service
  errorMessage: string | null = null;

  searchQuery: string = '';
  searched: boolean = false;
  filteredTrips: Trip[] = [];
  useFakeData: boolean = false; // Always use API now
  // Add these new properties at the top of the component class
  displayedTrips: Trip[] = [];
  currentPage: number = 1;
  tripsPerPage: number = 9;
  hasMoreTrips: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: TouristPrepackageShowService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Add authentication check
    // if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // Only run this in the browser (not on server)
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('navbar-shrink');
        } else {
          navbar?.classList.remove('navbar-shrink');
        }
      });
    }

    this.fetchTripsFromApi();

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
  // Add logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    console.log('sssssssssssssssssss');
    this.searched = true;
    this.currentPage = 1;
    this.filterTrips();
  }

  onSearchInputChange(): void {
    if (this.searchQuery.length === 0) {
      this.searched = false;
      this.currentPage = 1;
      this.fetchTripsFromApi();
    } else {
      this.filterTrips();
    }
  }

  private filterTrips(): void {
    if (!this.searchQuery) {
      this.currentPage = 1;
      this.fetchTripsFromApi();
      return;
    }

    const query = this.searchQuery.toLowerCase();

    // Always use API
    const offset = (this.currentPage - 1) * this.tripsPerPage;
    const size = this.tripsPerPage;
    console.log('Filtering trips with query:', query, 'offset:', offset, 'size:', size);
    this.apiService.searchTripsByCountry(query, offset, size).subscribe({
      next: (data: Trip[]) => {
        this.filteredTrips = data;
        this.updateDisplayedTrips();
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
        if (offset === 0) {
          this.filteredTrips = [];
        }
        this.updateDisplayedTrips();
      },
    });
  }

  private fetchTripsFromApi(): void {
    const country = this.searchQuery ? this.searchQuery.toLowerCase() : '';
    const offset = (this.currentPage - 1) * this.tripsPerPage;
    const size = this.tripsPerPage;
    console.log(offset, this.currentPage, this.tripsPerPage);
    this.apiService.searchTripsByCountry(country, offset, size).subscribe({
      next: (data: Trip[]) => {
        console.log('Fetched trips:', data);
        this.filteredTrips = data;
        // Fetch images for each trip
        data.forEach((trip, idx) => {
          this.apiService.getTripImage(trip.tourID).subscribe({
            next: (blob: Blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                trip.image = reader.result as string;
                // Optionally trigger change detection or update UI
              };
              reader.readAsDataURL(blob);
            },
            error: () => {
              trip.image = ''; // fallback or placeholder
            }
          });
        });
        this.updateDisplayedTrips();
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
        if (offset === 0) {
          this.filteredTrips = [];
        }
        this.updateDisplayedTrips();
      },
    });
  }

  private updateDisplayedTrips(): void {
    // For API, displayedTrips is the same as filteredTrips
    this.displayedTrips = this.filteredTrips;
    this.hasMoreTrips = this.filteredTrips.length === this.tripsPerPage;
  }

  loadMore(): void {
    this.currentPage++;
    this.fetchTripsFromApi();
  }

  toggleDataSource(): void {
    // No-op: always use API now
  }

  renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star"></i>';
    }

    return starsHtml;
  }
}
