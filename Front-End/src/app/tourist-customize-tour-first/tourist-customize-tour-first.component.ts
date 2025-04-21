import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tourist-customize-tour-first',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tourist-customize-tour-first.component.html',
  styleUrls: ['./tourist-customize-tour-first.component.css']
})
export class TouristCustomizeTourFirstComponent implements OnInit {
  // Form fields
  selectedDestination: string = '';
  selectedDuration: number = 1;
  selectedTourismTypes: string[] = [];
  currentStep = 0;

  steps = ['Destination', 'Tourism Type', 'Trip Duration', 'Summary'];

  
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeDestinations();
    // Uncomment for production
    // this.checkAuthentication();
  }

  /**
   * Initialize the list of destinations and their slugs
   */
  initializeDestinations(): void {
    const destinations = [
      'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 
      'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 
      'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'Egypt', 
      'Finland', 'France', 'Germany', 'Greece', 'India', 'Indonesia', 'Iran', 
      'Iraq', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait', 
      'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 
      'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 
      'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 
      'South Africa', 'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 
      'Thailand', 'Tunisia', 'Turkey', 'UAE', 'UK', 'Ukraine', 'USA', 
      'Vietnam', 'Yemen'
    ];

    this.destinationSlugs = destinations.map(country => ({
      name: country,
      slug: country.toLowerCase().replace(/\s+/g, '-'),
    }));
  }

  /**
   * Check if user is authenticated and is a tourist
   */
  checkAuthentication(): void {
    if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
      this.authService.logout();
      this.router.navigate(['/login']);
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
      this.selectedTourismTypes = this.selectedTourismTypes.filter(t => t !== type);
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

    if (this.selectedDestination && this.selectedTourismTypes.length && this.selectedDuration) {
      this.currentStep++;
      // ننتقل للخطوة الثانية
      console.log('Next step!');
    } else {
      alert('Please complete all selections!');
    }

    if (!this.validateForm()) return;

    this.isLoading = true;
    
    // In a real application, you would call a service here
    console.log('Form submitted with:', {
      destination: this.selectedDestination,
      duration: this.selectedDuration,
      tourismTypes: this.selectedTourismTypes
    });

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      // Navigate to next step or show results
      this.router.navigate(['/tourist/custom-tour/results']);
    }, 1500);
  }
}