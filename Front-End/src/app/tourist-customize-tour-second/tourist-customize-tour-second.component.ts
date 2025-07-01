import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TouristCustomizeTourSecondService } from './tourist-customize-tour-second.service';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

interface Place {
  id: number;
  name: string;
  imageUrl: string;
}

interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    description: string;
    location?: string;
  }[];
}

@Component({
  selector: 'app-tourist-customize-tour-second',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ChatComponent],
  templateUrl: './tourist-customize-tour-second.component.html',
  styleUrls: ['./tourist-customize-tour-second.component.css'],
})
export class TouristCustomizeTourSecondComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actu

  currentStep = 1;
  steps = [
    'Entering Trip Data',
    'Select Places',
    'Trip scedule Generation',
    'Summary',
  ];
  isLoading = false;
  submitted = false;
  errorMessage: string | null = null;

  hotels: Place[] = [];
  restaurants: Place[] = [];
  tourismPlaces: Place[] = [];

  selectedHotels: Place[] = [];
  selectedRestaurants: Place[] = [];
  selectedTourismPlaces: Place[] = [];

  formData = {
    hotels: [] as Place[],
    restaurants: [] as Place[],
    places: [] as Place[],
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private tourService: TouristCustomizeTourSecondService
  ) {}

  ngOnInit(): void {
    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as 'tourist' | 'guide' | 'company' | 'admin';
    
    this.checkAuthentication();
    this.loadTourOptions();
  }

  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }

  /**
   * Check if user is authenticated and is a tourist
   */
  checkAuthentication(): void {
    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== UserType.TOURIST
    ) {
      this.authService.logout();
      // this.router.navigate(['/login']);
    }
  }

  loadTourOptions(): void {
    this.isLoading = true;

    this.tourService.getTourOptions().subscribe({
      next: (response) => {
        // Always use fake data for now, regardless of API response
        this.loadFakeData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tour options:', error);
        this.loadFakeData();
        this.isLoading = false;
      },
    });
  }

  // Ensure this is robust
  private loadFakeData(): void {
    try {
      this.hotels = this.loadFakeHotels();
      this.restaurants = this.loadFakeRestaurants();
      this.tourismPlaces = this.loadFakeTourismPlaces();
      this.changeDetectorRef.detectChanges();
    } catch (e) {
      console.error('Error loading fake data:', e);
      // Fallback to empty arrays if something goes wrong
      this.hotels = [];
      this.restaurants = [];
      this.tourismPlaces = [];
    }
  }

  private loadFakeHotels(): Place[] {
    return [
      {
        id: 1,
        name: 'Hotel Paradise',
        imageUrl: '../assets/img/pexels-pixabay-262047.jpg',
      },
      {
        id: 2,
        name: 'Luxury Stay',
        imageUrl: '../assets/img/pexels-thorsten-technoman-109353-338504.jpg',
      },
      {
        id: 3,
        name: 'Ocean View',
        imageUrl: '../assets/img/pexels-pixabay-271624.jpg',
      },
      {
        id: 4,
        name: 'Hotel Paradise 2',
        imageUrl: '../assets/img/pexels-pixabay-164595.jpg',
      },
      {
        id: 5,
        name: 'Luxury Stay 2',
        imageUrl: '../assets/img/pexels-pixabay-271639.jpg',
      },
      {
        id: 6,
        name: 'Ocean View 2',
        imageUrl: '../assets/img/pexels-pixabay-262047.jpg',
      },
    ];
  }

  private loadFakeRestaurants(): Place[] {
    return [
      {
        id: 1,
        name: 'The Fancy Fork',
        imageUrl: '../assets/img/pexels-mali-64208.jpg',
      },
      {
        id: 2,
        name: 'Gourmet Delight',
        imageUrl: '../assets/img/pexels-chanwalrus-958545.jpg',
      },
      {
        id: 3,
        name: 'Tasty Bites',
        imageUrl: '../assets/img/pexels-elevate-1267320.jpg',
      },
      {
        id: 4,
        name: 'Hotel Paradise 2',
        imageUrl: '../assets/img/pexels-pixabay-262978.jpg',
      },
      {
        id: 5,
        name: 'Luxury Stay 2',
        imageUrl: '../assets/img/pexels-robinstickel-70497.jpg',
      },
      {
        id: 6,
        name: 'Ocean View 2',
        imageUrl: '../assets/img/pexels-valeriya-1484516.jpg',
      },
    ];
  }

  private loadFakeTourismPlaces(): Place[] {
    return [
      { id: 1, name: 'Historic Castle', imageUrl: '../assets/img/paris.jpeg' },
      {
        id: 2,
        name: 'City Park',
        imageUrl: '../assets/img/pexels-qibili-18291196.jpg',
      },
      {
        id: 3,
        name: 'Art Museum',
        imageUrl: '../assets/img/boats-3932034_1280.jpg',
      },
      { id: 4, name: 'Hotel Paradise 2', imageUrl: '../assets/img/cairo.jpeg' },
      {
        id: 5,
        name: 'Luxury Stay 2',
        imageUrl: '../assets/img/e73db164bbe81f22b68ae3536f624c24.jpg',
      },
      { id: 6, name: 'Ocean View 2', imageUrl: '../assets/img/paris.jpeg' },
    ];
  }

  toggleSelection(section: string, item: Place): void {
    const selectedArray = this.getSelectedArray(section);
    const index = selectedArray.findIndex(
      (selected) => selected.id === item.id
    );

    if (index === -1) {
      selectedArray.push({ ...item });
    } else {
      selectedArray.splice(index, 1);
    }

    switch (section) {
      case 'hotels':
        this.selectedHotels = [...selectedArray];
        break;
      case 'restaurants':
        this.selectedRestaurants = [...selectedArray];
        break;
      case 'places':
        this.selectedTourismPlaces = [...selectedArray];
        break;
    }

    this.formData[section as keyof typeof this.formData] = [...selectedArray];
  }

  isSelected(section: string, item: Place): boolean {
    const selectedArray = this.getSelectedArray(section);
    return selectedArray.some((selected) => selected.id === item.id);
  }

  private getSelectedArray(section: string): Place[] {
    switch (section) {
      case 'hotels':
        return this.selectedHotels;
      case 'restaurants':
        return this.selectedRestaurants;
      case 'places':
        return this.selectedTourismPlaces;
      default:
        return [];
    }
  }

  validateForm(): boolean {
    this.submitted = true;
    this.errorMessage = null;

    if (
      this.selectedHotels.length === 0 &&
      this.selectedRestaurants.length === 0 &&
      this.selectedTourismPlaces.length === 0
    ) {
      this.errorMessage = 'Please select at least one place.';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      console.error(this.errorMessage || 'Validation error');
      return;
    }

    this.isLoading = true;

    const requestData = {
      hotels: this.selectedHotels,
      restaurants: this.selectedRestaurants,
      places: this.selectedTourismPlaces,
      duration: 3, // Default duration for demo
      touristId: this.authService.getUserId(),
    };

    // =============================================
    // DEMO MODE NAVIGATION (comment this block for real API)
    // =============================================
    console.log('Running in demo mode with fake data');
    // For fake data mode
    if (this.tourService.getUseFakeData()) {
      const fakeResponse = {
        success: true,
        message: 'Demo submission successful',
        selections: requestData,
        itinerary: this.generateDemoItinerary(requestData), // Using component's version
      };

      this.router.navigate(['/touristcustomizetourthirdcomponent'], {
        state: { tourData: fakeResponse },
      });
      this.isLoading = false;
      return;
    }
    // =============================================
    // END OF DEMO MODE BLOCK
    // =============================================

    // =============================================
    // REAL API CALL (uncomment this block for real API)
    // =============================================
    /*
    this.tourService.submitCustomTourSelections(requestData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/tourist/custom-tour/results'], {
          state: { 
            tourData: {
              ...response,
              selections: requestData
            }
          }
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Submission failed';
        
        // Optional: Still navigate with error state
        this.router.navigate(['/tourist/custom-tour/results'], {
          state: { 
            tourData: {
              success: false,
              message: 'Error occurred',
              error: error.message,
              selections: requestData
            }
          }
        });
      }
    });
    */
    // =============================================
    // END OF REAL API BLOCK
    // =============================================
  }

  // Helper method for demo mode
  private generateDemoItinerary(data: any): any[] {
    const itinerary = [];
    const days = data.duration || 3;

    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        activities: [
          {
            time: '09:00',
            activity: `Visit ${
              data.places[i % data.places.length]?.name || 'local attraction'
            }`,
            location: 'City Center',
          },
          {
            time: '12:00',
            activity: `Lunch at ${
              data.restaurants[i % data.restaurants.length]?.name ||
              'local restaurant'
            }`,
            location: 'Downtown',
          },
        ],
      });
    }
    return itinerary;
  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
