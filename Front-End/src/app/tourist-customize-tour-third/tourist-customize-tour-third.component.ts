import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHotel,
  faUtensils,
  faLandmark,
  faTrashAlt,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { TouristCustomizeTourThirdService } from './tourist-customize-tour-third.service';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

interface TripItem {
  id: number;
  name: string;
  type: 'hotel' | 'restaurant' | 'place';
  description?: string;
}

interface DayPlan {
  dayNumber: number;
  date: string;
  items: TripItem[];
}

@Component({
  selector: 'app-tourist-customize-tour-third',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    ChatComponent,
  ],
  templateUrl: './tourist-customize-tour-third.component.html',
  styleUrls: ['./tourist-customize-tour-third.component.css'],
})
export class TouristCustomizeTourThirdComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service

  // Font Awesome icons
  faHotel = faHotel;
  faUtensils = faUtensils;
  faLandmark = faLandmark;
  faTrashAlt = faTrashAlt;
  faArrowRightFromBracket = faArrowRightFromBracket;

  currentStep = 2;
  steps = ['Destination', 'Tourism Type', 'Trip Schedule', 'Summary'];
  isLoading = false;
  tripDays: DayPlan[] = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private tourService: TouristCustomizeTourThirdService
  ) {}

  ngOnInit(): void {
    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';

    // this.checkAuthentication();
    this.generateFakeTripData(3);
  }

  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }

  checkAuthentication(): void {
    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== UserType.TOURIST
    ) {
      this.authService.logout();
      // this.router.navigate(['/login']);
    }
  }

  generateFakeTripData(days: number): void {
    const cities = ['Paris', 'Rome', 'Barcelona', 'Tokyo', 'New York'];
    const hotelNames = [
      'Grand Plaza Hotel',
      'Sunset Resort',
      'Mountain View Inn',
      'Beachfront Paradise',
      'Downtown Suites',
    ];
    const restaurantNames = [
      'La Bella Italia',
      'Sakura Sushi',
      'Le Petit Bistro',
      'The Steakhouse',
      'Ocean View Restaurant',
    ];
    const placeNames = [
      'Eiffel Tower',
      'Colosseum',
      'Sagrada Familia',
      'Shibuya Crossing',
      'Central Park',
    ];

    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      this.tripDays.push({
        dayNumber: i + 1,
        date: formattedDate,
        items: [
          {
            id: 1,
            name: hotelNames[Math.floor(Math.random() * hotelNames.length)],
            type: 'hotel',
            description: 'Check-in and relax after your journey',
          },
          {
            id: 2,
            name: restaurantNames[
              Math.floor(Math.random() * restaurantNames.length)
            ],
            type: 'restaurant',
            description: 'Lunch with local cuisine',
          },
          {
            id: 3,
            name: placeNames[Math.floor(Math.random() * placeNames.length)],
            type: 'place',
            description: 'Explore this famous landmark',
          },
          {
            id: 4,
            name: restaurantNames[
              Math.floor(Math.random() * restaurantNames.length)
            ],
            type: 'restaurant',
            description: 'Dinner with beautiful views',
          },
        ],
      });
    }
  }

  getIcon(type: 'hotel' | 'restaurant' | 'place') {
    switch (type) {
      case 'hotel':
        return this.faHotel;
      case 'restaurant':
        return this.faUtensils;
      case 'place':
        return this.faLandmark;
      default:
        return null;
    }
  }

  deleteItem(day: DayPlan, item: TripItem): void {
    day.items = day.items.filter((i) => i.id !== item.id);
  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }

  get useFakeData(): boolean {
    return this.tourService.useFakeData;
  }

  set useFakeData(value: boolean) {
    this.tourService.useFakeData = value;
  }

  toggleFakeData(): void {
    this.useFakeData = !this.useFakeData;
  }

  onSubmit(): void {
    this.isLoading = true;

    this.tourService.submitCustomTourSelections(this.tripDays).subscribe({
      next: (response) => {
        this.router
          .navigate(['/touristcustomizetourfourthcomponent'], {
            state: { tripDays: this.tripDays, submissionResponse: response },
          })
          .then((navSuccess) => {
            if (!navSuccess) {
              console.error('Navigation failed');
            }
            this.isLoading = false;
          });
      },
      error: (err) => {
        console.error('Submission error:', err);
        this.isLoading = false;
      },
    });
  }
}
