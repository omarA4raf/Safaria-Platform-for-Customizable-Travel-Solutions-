import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TouristCustomizeTourFirsService } from './tourist-customize-tour-firs.service';

@Component({
  selector: 'app-tourist-customize-tour-first',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tourist-customize-tour-first.component.html',
  styleUrls: ['./tourist-customize-tour-first.component.css'],
})
export class TouristCustomizeTourFirstComponent implements OnInit {
  // Form fields
  selectedDestination: string = '';
  selectedDuration: number = 1;
  selectedTourismTypes: string[] = [];
  currentStep = 0;

  steps = ['Entering Trip Data', 'Select Places', 'Trip scedule Generation', 'Summary'];

  // Available options
  tourismTypes: string[] = [
    'cultural',
    'adventure',
    'beach',
    'historical',
    'wildlife',
    'religious',
  ];
  destinationSlugs: { name: string; slug: string }[] = [];
  tripDurations = [1, 2, 3, 4, 5, 6, 7];

  // State management
  isLoading: boolean = false;
  submitted: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tourService: TouristCustomizeTourFirsService
  ) {}

  ngOnInit(): void {
    this.initializeDestinations();
    // Uncomment for production
    this.checkAuthentication();
  }

  /**
   * Initialize the list of destinations and their slugs
   */
  initializeDestinations(): void {
    const destinations = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahrain',
      'Bangladesh',
      'Belgium',
      'Brazil',
      'Canada',
      'China',
      'Colombia',
      'Denmark',
      'Egypt',
      'Finland',
      'France',
      'Germany',
      'Greece',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Italy',
      'Japan',
      'Jordan',
      'Kenya',
      'Kuwait',
      'Lebanon',
      'Malaysia',
      'Mexico',
      'Morocco',
      'Netherlands',
      'New Zealand',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russia',
      'Saudi Arabia',
      'South Africa',
      'Spain',
      'Sudan',
      'Sweden',
      'Switzerland',
      'Syria',
      'Thailand',
      'Tunisia',
      'Turkey',
      'UAE',
      'UK',
      'Ukraine',
      'USA',
      'Vietnam',
      'Yemen',
    ];

    this.destinationSlugs = destinations.map((country) => ({
      name: country,
      slug: country.toLowerCase().replace(/\s+/g, '-'),
    }));
  }

  /**
   * Check if user is authenticated and is a tourist
   */
  checkAuthentication(): void {
    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== 'TOURIST'
    ) {
      this.authService.logout();
      // this.router.navigate(['/login']);
    }
  }

  /**
   * Toggle tourism type selection
   * @param type The tourism type to toggle
   * @param event The checkbox change event
   */
  toggleTourismType(type: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTourismTypes.push(type);
    } else {
      this.selectedTourismTypes = this.selectedTourismTypes.filter(
        (t) => t !== type
      );
    }
  }

  /**
   * Select trip duration
   * @param duration The selected duration (1-7 days)
   */
  selectDuration(duration: number): void {
    this.selectedDuration = duration;
  }

  /**
   * Validate form fields
   * @returns boolean indicating if the form is valid
   */
  validateForm(): boolean {
    this.submitted = true;

    if (!this.selectedDestination) {
      this.errorMessage = 'Destination country is required.';
      return false;
    }

    if (this.selectedTourismTypes.length === 0) {
      this.errorMessage = 'Please select at least one tourism type.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    console.log('Form submitted');
    if (!this.validateForm()) return;
  
    this.isLoading = true;
  
    // Prepare the request data
    const requestData = {
      destination: this.selectedDestination,
      duration: this.selectedDuration,
      tourismTypes: this.selectedTourismTypes,
      touristId: 'temp-user-id' // Temporary hardcoded for testing
    };
  
    // For testing - bypass API call
    console.log('Attempting navigation...');
    const mockResponse = {
      destination: this.selectedDestination,
      duration: this.selectedDuration,
      tourismTypes: this.selectedTourismTypes,
      samplePlaces: ['Place 1', 'Place 2', 'Place 3'] // Mock data
    };
    
    this.router.navigate(['/touristcustomizetoursecondcomponent'], {
      state: { tourOptions: mockResponse }
    });
    this.isLoading = false;
    return;
  
    // Actual API call (commented out for testing)
    /*
    this.tourService.getCustomTourOptions(requestData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/tourist-customize-tour-second'], {
          state: { tourOptions: response }
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Request failed';
      }
    });
    */
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
