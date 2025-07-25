import { Component, OnInit, Inject } from '@angular/core'; // <-- Add 'Inject' here
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TouristViewTripService } from './tourist-view-trip.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Add this import
import { PLATFORM_ID } from '@angular/core';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

export interface AvailableDate {
  id: number; // Add this line
  startDate: Date | null;
  endDate: Date | null;
  availableSeats: number | null;
  budget: number; // Changed from null to number since it's required
}

export interface Trip {
  id: number;
  title: string;
  images: string[];
  imageUrl?: string;
  destinationCountry: string;
  tourismTypes: string[];
  duration: number | null;
  price?: number; // Base price (can be used as fallback)
  availableDates: AvailableDate[];
  description: string;
  freeCancellationDeadline: number | null;
  currency: string;
  rating: number;
  providerName: string;
}

@Component({
  selector: 'app-tourist-view-trip',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ChatComponent],
  templateUrl: './tourist-view-trip.component.html',
  styleUrls: ['./tourist-view-trip.component.css'],
})
export class TouristViewTripComponent implements OnInit {
  // Step 2: Add these required properties
  // userId = '123'; // Replace with actual user ID from your auth service
  // userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service
  // trip: Trip = {
  //   id: 0,
  //   title: '',
  //   images: [' '], // Default image
  //   destinationCountry: '',
  //   tourismTypes: [],
  //   duration: null,
  //   availableDates: [
  //     { startDate: null, endDate: null, availableSeats: null, budget: 0 },
  //   ],
  //   description: '',
  //   freeCancellationDeadline: null,
  //   currency: 'USD',
  //   rating: 0,
  //   price: 0,
  //   providerName: '', // Added to fix the error
  // };

  currentImageIndex = 0;
  isLoading = true;
  errorMessage: string | null = null;

  memberCount: number = 1;
  totalPrice: number = 0;
  ationCountry: string = ''; // Provide a default value

  // Add a property to hold the value of Number.POSITIVE_INFINITY
  readonly positiveInfinity = Number.POSITIVE_INFINITY;

  // Add these methods
  incrementMembers(): void {
    if (
      this.selectedDate &&
      this.memberCount < (this.selectedDate.availableSeats || Infinity)
    ) {
      this.memberCount++;
      this.calculateTotal();
    }
  }

  decrementMembers(): void {
    if (this.memberCount > 1) {
      this.memberCount--;
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.totalPrice = this.getCurrentPrice() * this.memberCount;
  }

  userId: string = '';
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist';

  trip!: Trip; // Will be set after fetching from backend

  constructor(
    private route: ActivatedRoute,
    private tripService: TouristViewTripService,
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    this.route.params.subscribe((params) => {
      const tripId = +params['id']; // Get ID from route
      const tripProviderName = params['tourProvider']; // Get provider name from route
      this.loadTrip(tripId,tripProviderName);
    });
    // Step 3: Initialize user data (replace with your actual auth logic)
    this.userId = this.authService.getUserId() || '';
    this.userType = this.authService.getSafeUserType();
  }

  // Add to your component
  loadTrip(id: number,tripProviderName: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.tripService.getTripById(id).subscribe({
      next: (data: any) => {
        // Fetch image blob from backend
        this.tripService.getTripImage(id).subscribe({
          next: (imgBlob: Blob) => {
            if (imgBlob && imgBlob.size > 0) {
              const reader = new FileReader();
              reader.onload = () => {
                const imageDataUrl = reader.result as string;
                this.trip = {
                  id: data.tourId ?? data.id ?? id,
                  title: data.title,
                  images: [imageDataUrl],
                  imageUrl: imageDataUrl,
                  destinationCountry: data.destinationCountry,
                  tourismTypes: data.tourismTypes ?? [],
                  duration: data.duration ?? null,
                  availableDates: (data.availableDates || data.schedules || []).map((d: any) => ({
                    id: d.id, // Add this line
                    startDate: d.startDate ? new Date(d.startDate) : null,
                    endDate: d.endDate ? new Date(d.endDate) : null,
                    availableSeats: d.availableSeats ?? null,
                    budget: d.price ?? d.budget ?? 0,
                  })),
                  description: data.description,
                  freeCancellationDeadline: data.freeCancellationDeadline ?? null,
                  currency: data.currency,
                  rating: data.rating ?? 0,
                  providerName: tripProviderName,
                };

                this.currentImageIndex = 0;
                this.selectedDateIndex = null;
                this.selectedDate = null;
                this.memberCount = 1;
                this.calculateTotal();
                this.isLoading = false;
              };
              reader.readAsDataURL(imgBlob);
            } else {
              // fallback if blob is empty
              this.trip = {
                id: data.tourId ?? data.id ?? id,
                title: data.title,
                images: (data.images && Array.isArray(data.images))
                  ? data.images.map((img: any) => typeof img === 'string' ? img : img.imageUrl)
                  : [],
                imageUrl: undefined,
                destinationCountry: data.destinationCountry,
                tourismTypes: data.tourismTypes ?? [],
                duration: data.duration ?? null,
                availableDates: (data.availableDates || data.schedules || []).map((d: any) => ({
                  id: d.id, // Add this line
                  startDate: d.startDate ? new Date(d.startDate) : null,
                  endDate: d.endDate ? new Date(d.endDate) : null,
                  availableSeats: d.availableSeats ?? null,
                  budget: d.price ?? d.budget ?? 0,
                })),
                description: data.description,
                freeCancellationDeadline: data.freeCancellationDeadline ?? null,
                currency: data.currency,
                rating: data.rating ?? 0,
                providerName:  tripProviderName,
              };

              if (this.trip.images && this.trip.images.length > 0) {
                this.trip.imageUrl = this.trip.images[0];
              }
              this.currentImageIndex = 0;
              this.selectedDateIndex = null;
              this.selectedDate = null;
              this.memberCount = 1;
              this.calculateTotal();
              this.isLoading = false;
            }
          },
          error: () => {
            // fallback if image fetch fails
            this.trip = {
              id: data.tourId ?? data.id ?? id,
              title: data.title,
              images: (data.images && Array.isArray(data.images))
                ? data.images.map((img: any) => typeof img === 'string' ? img : img.imageUrl)
                : [],
              imageUrl: undefined,
              destinationCountry: data.destinationCountry,
              tourismTypes: data.tourismTypes ?? [],
              duration: data.duration ?? null,
              availableDates: (data.availableDates || data.schedules || []).map((d: any) => ({
                id: d.id, // Add this line
                startDate: d.startDate ? new Date(d.startDate) : null,
                endDate: d.endDate ? new Date(d.endDate) : null,
                availableSeats: d.availableSeats ?? null,
                budget: d.price ?? d.budget ?? 0,
              })),
              description: data.description,
              freeCancellationDeadline: data.freeCancellationDeadline ?? null,
              currency: data.currency,
              rating: data.rating ?? 0,
              providerName:  tripProviderName,
            };

            if (this.trip.images && this.trip.images.length > 0) {
              this.trip.imageUrl = this.trip.images[0];
            }
            this.currentImageIndex = 0;
            this.selectedDateIndex = null;
            this.selectedDate = null;
            this.memberCount = 1;
            this.calculateTotal();
            this.isLoading = false;
          }
        });
      },
      error: (err: any) => {
        this.errorMessage =
          'Failed to load trip details. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  prevImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.trip.images.length - 1
        : this.currentImageIndex - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === this.trip.images.length - 1
        ? 0
        : this.currentImageIndex + 1;
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

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  formatDate(date: Date | null): string {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  }

  // Add this to your component class
  selectedDateIndex: number | null = null;
  selectedDate: AvailableDate | null = null;

  // Update selectDate to recalculate
  selectDate(index: number): void {
    this.selectedDateIndex = index;
    this.selectedDate = this.trip.availableDates[index];
    this.calculateTotal();
  }

  navigateToPayment(): void {
    if (!this.selectedDate) {
      alert('Please select a date first');
      return;
    }

    const scheduleId = this.selectedDate.id;
    if (!scheduleId) {
      alert('Schedule ID not found for selected date.');
      return;
    }

    const token = this.authService.getToken() ?? '';
    // console.log('JWT Token before booking:', token); // <-- This will show the token in the browser console

    this.tripService.bookTrip(scheduleId, this.memberCount, Number(this.userId), token).subscribe({
      next: (response) => {
        this.router.navigate(['/payment'], {
          state: {
            tripDetails: this.trip,
            selectedDate: this.selectedDate,
            memberCount: this.memberCount,
            bookingResponse: response,
          },
        });
      },
      error: (err) => {
        if(this.selectedDate && this.selectedDate.availableSeats !== null && this.selectedDate.availableSeats < this.memberCount) {
          alert('Not enough seats available for the selected date.');
          return;
        }
        alert('Booking failed. Please try again.');
      }
    });
  }

  getCurrentPrice(): number {
    if (this.selectedDate) {
      return this.selectedDate.budget;
    }
    // fallback: use first available date or 0
    return this.trip.availableDates?.[0]?.budget ?? 0;
  }

  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: this.userId , // Get from JWT token or session storage
      type: this.userType, // Get from your authentication service
    };
  }
}
