import { Component, OnInit, Inject } from '@angular/core'; // <-- Add 'Inject' here
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TouristPrepackageSeeTourService } from './tourist-prepackage-see-tour.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Add this import
import { PLATFORM_ID } from '@angular/core';

export interface AvailableDate {
  startDate: Date | null;
  endDate: Date | null;
  availableSeats: number | null;
  budget: number; // Changed from null to number since it's required
}

export interface Trip {
  id: number;
  title: string;
  images: string[];
  imageUrl?: string; // Add this optional property
  destinationCountry: string;
  tourismTypes: string[];
  duration: number | null;
  price: number; // Base price (can be used as fallback)
  availableDates: AvailableDate[];
  description: string;
  freeCancellationDeadline: number | null; // days before trip
  currency: string;
  rating: number;
}

@Component({
  selector: 'app-tourist-prepackage-see-tour',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './tourist-prepackage-see-tour.component.html',
  styleUrls: ['./tourist-prepackage-see-tour.component.css'],
})
export class TouristPrepackageSeeTourComponent implements OnInit {
  trip: Trip = {
    id: 0,
    title: '',
    images: [' '], // Default image
    destinationCountry: '',
    tourismTypes: [],
    duration: null,
    availableDates: [
      { startDate: null, endDate: null, availableSeats: null, budget: 0 },
    ],
    description: '',
    freeCancellationDeadline: null,
    currency: 'USD',
    rating: 0,
    price: 0,
  };

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

  constructor(
    private route: ActivatedRoute,
    private tripService: TouristPrepackageSeeTourService,
    private authService: AuthService,
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
      this.loadTrip(tripId);
    });
  }

  // Add to your component
  loadTrip(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.calculateTotal();

    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
        // Use the first image from the images array as default
        if (trip.images && trip.images.length > 0) {
          this.trip.imageUrl = trip.images[0];
        }
        this.isLoading = false;

        // Optional: If you still want to fetch images via blob
        // this.tripService.getTripImage(id).subscribe({
        //   next: (image) => {
        //     this.trip.imageUrl = URL.createObjectURL(image);
        //     this.isLoading = false;
        //   },
        //   error: (err) => {
        //     console.error('Error loading image:', err);
        //     this.isLoading = false;
        //   }
        // });
      },
      error: (err) => {
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
    if (this.selectedDateIndex === null) {
      alert('Please select a date first');
      return;
    }

    // Navigate to payment with trip ID and selected date index
    this.router.navigate([
      '/touristprepackagepaytourcomponent',
      this.trip.id,
      this.selectedDateIndex,
    ]);
  }

  getCurrentPrice(): number {
    if (this.selectedDate) {
      return this.selectedDate.budget;
    }
    return this.trip.price; // Fallback to base price
  }
}
