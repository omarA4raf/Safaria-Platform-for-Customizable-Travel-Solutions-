import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TourguideCreateTripService } from './tourguide-create-trip.service';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-tourguide-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './tourguide-create-trip.component.html',
  styleUrl: './tourguide-create-trip.component.css',
})
export class TourguideCreateTripComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'guide'; // Replace with actual user type from your auth service
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService,
    private tripService: TourguideCreateTripService
  ) {}

  // Loading state for the submit button
  createIsLoading: boolean = false;

  // Loading state for the saving draft button
  SavingisLoading: boolean = false;

  // Array to hold uploaded images
  images: { url: string | null; file: File | null }[] = [
    { url: null, file: null },
  ];

  // Object to hold trip details
  trip = {
    title: '',
    destinationCountry: '', // New field for destination country
    tourismTypes: [] as string[], // New field for tourism types
    duration: null as number | null,
    availableDates: [
      { startDate: null, endDate: null, availableSeats: null, budget: null },
    ],
    description: '',
    freeCancellationDeadline: null as number | null, // New field for free cancellation deadline
    currency: '', // New field for currency
  };

  // List of countries
  countries: string[] = [];

  // List of currencies with symbols
  currencies: { code: string; name: string; symbol: string }[] = [
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
    { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$' },
    { code: 'COP', name: 'Colombian Peso', symbol: 'COL$' },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.' },
    { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'OMR' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD' },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'JOD' },
    { code: 'LBP', name: 'Lebanese Pound', symbol: 'L£' },
    { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
    { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr' },
    { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
    { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
    { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' },
    { code: 'UZS', name: 'Uzbekistani Som', symbol: 'soʻm' },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾' },
    { code: 'AMD', name: 'Armenian Dram', symbol: '֏' },
    { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'сом' },
    { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'SM' },
    { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T' },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋' },
    { code: 'IRR', name: 'Iranian Rial', symbol: '﷼' },
    { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د' },
    { code: 'SYP', name: 'Syrian Pound', symbol: '£S' },
    { code: 'YER', name: 'Yemeni Rial', symbol: '﷼' },
    { code: 'MNT', name: 'Mongolian Tögrög', symbol: '₮' },
    { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨' },
    { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs' },
    { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K' },
    { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
    { code: 'LAK', name: 'Lao Kip', symbol: '₭' },
    { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$' },
    { code: 'BND', name: 'Brunei Dollar', symbol: 'B$' },
    { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$' },
    { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K' },
    { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$' },
    { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$' },
    { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT' },
    { code: 'WST', name: 'Samoan Tala', symbol: 'WS$' },
    { code: 'XPF', name: 'CFP Franc', symbol: '₣' },
    { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' },
    { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
    { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$' },
    { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' },
    { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: 'Z$' },
  ];

  // List of tourism types
  tourismTypes: string[] = [
    'cultural',
    'adventure',
    'beach',
    'historical',
    'wildlife',
    'religious',
  ];

  // Error messages
  errorMessages: { [key: string]: string } = {
    title: '',
    destinationCountry: '',
    tourismTypes: '',
    duration: '',
    availableSeats: '',
    description: '',
    availableDates: '',
    images: '',
    freeCancellationDeadline: '', // New error message for free cancellation deadline
    currency: '', // New error message for currency
  };

  ngOnInit(): void {
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== UserType.GUIDE
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== UserType.GUIDE
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.initializeCountries();

    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';
  }

  // Initialize the list of countries
  initializeCountries(): void {
    this.countries = [
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
  }

  // Toggle tourism type selection
  toggleTourismType(type: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.trip.tourismTypes.push(type);
    } else {
      this.trip.tourismTypes = this.trip.tourismTypes.filter((t) => t !== type);
    }
  }

  // Trigger file input when the user clicks on an image box
  triggerFileInput(index: number): void {
    const fileInput = document.getElementById(
      'fileInput' + index
    ) as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.images[index] = { url: reader.result as string, file };
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove an image
  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  // Add a new image upload box
  addImageBox(): void {
    this.images.push({ url: null, file: null });
  }

  // Add a new date range
  addDateRange(): void {
    this.trip.availableDates.push({
      startDate: null,
      endDate: null,
      availableSeats: null,
      budget: null,
    });
  }

  // Validate form inputs
  validateForm(): boolean {
    let isValid = true;

    // Reset error messages
    this.errorMessages = {
      title: '',
      destinationCountry: '',
      tourismTypes: '',
      duration: '',
      availableSeats: '',
      description: '',
      availableDates: '',
      images: '',
      freeCancellationDeadline: '', // New error message for free cancellation deadline
      currency: '', // New error message for currency
    };

    // Validate title
    if (!this.trip.title) {
      this.errorMessages['title'] = 'Trip title is required.';
      isValid = false;
    }

    // Validate destination country
    if (!this.trip.destinationCountry) {
      this.errorMessages['destinationCountry'] =
        'Destination country is required.';
      isValid = false;
    }

    // Validate tourism types
    if (this.trip.tourismTypes.length === 0) {
      this.errorMessages['tourismTypes'] =
        'At least one tourism type is required.';
      isValid = false;
    }

    // Validate duration
    if (!this.trip.duration || this.trip.duration <= 0) {
      this.errorMessages['duration'] = 'Duration must be a positive number.';
      isValid = false;
    }

    // Validate available dates
    if (this.trip.availableDates.length === 0) {
      this.errorMessages['availableDates'] =
        'At least one date range is required.';
      isValid = false;
    } else {
      for (let dateRange of this.trip.availableDates) {
        if (!dateRange.startDate || !dateRange.endDate) {
          this.errorMessages['availableDates'] =
            'Start and end dates are required for all date ranges.';
          isValid = false;
          break;
        }
        if (!dateRange.availableSeats || dateRange.availableSeats <= 0) {
          this.errorMessages['availableSeats'] =
            'Available seats must be a positive number.';
          isValid = false;
          break;
        }
        if (!dateRange.budget || dateRange.budget <= 0) {
          this.errorMessages['budget'] = 'Budget must be a positive number.';
          isValid = false;
          break;
        }
      }
    }

    // Validate description
    if (!this.trip.description) {
      this.errorMessages['description'] = 'Description is required.';
      isValid = false;
    }

    // Validate free cancellation deadline
    if (
      !this.trip.freeCancellationDeadline ||
      this.trip.freeCancellationDeadline <= 0
    ) {
      this.errorMessages['freeCancellationDeadline'] =
        'Free cancellation deadline must be a positive number.';
      isValid = false;
    }

    // Validate currency
    if (!this.trip.currency) {
      this.errorMessages['currency'] = 'Currency is required.';
      isValid = false;
    }

    // Validate images
    if (this.images.length === 0 || this.images.every((img) => !img.file)) {
      this.errorMessages['images'] = 'At least one image is required.';
      isValid = false;
    }

    return isValid;
  }
  removeDateRange(index: number): void {
    this.trip.availableDates.splice(index, 1);
  }

  hasData(): boolean {
    return !!(
      this.trip.title ||
      this.trip.destinationCountry ||
      this.trip.tourismTypes.length > 0 ||
      this.trip.duration !== null ||
      this.trip.availableDates.some(
        (dateRange) =>
          dateRange.startDate ||
          dateRange.endDate ||
          dateRange.availableSeats !== null ||
          dateRange.budget !== null
      ) ||
      this.trip.description ||
      this.trip.freeCancellationDeadline !== null ||
      this.trip.currency ||
      this.images.some((image) => image.file !== null)
    );
  }
  private prepareFormData(): FormData {
    const formData = new FormData();

    // Create the tourData object exactly as per your trip structure
    const tourData = {
      title: this.trip.title,
      destinationCountry: this.trip.destinationCountry,
      tourismTypes: this.trip.tourismTypes,
      duration: this.trip.duration,
      availableDates: this.trip.availableDates, // array of { startDate, endDate, availableSeats, price }
      description: this.trip.description,
      freeCancellationDeadline: this.trip.freeCancellationDeadline,
      currency: this.trip.currency,
      tourProviderId: this.authService.getUserId(),
    };

    // Append tourData as JSON blob (important for Spring's @RequestPart)
    formData.append(
      'tourData',
      new Blob([JSON.stringify(tourData)], { type: 'application/json' })
    );

    // Append all image files with the same key "images"
    this.images.forEach((image, index) => {
      if (image.file) {
        const fileExtension = image.file.name.split('.').pop() || 'jpg';
        formData.append(
          'images',
          image.file,
          `image_${index}.${fileExtension}`
        );
      }
    });

    return formData;
  }

  // Handle form submission
  onSubmit(): void {
    if (!this.validateForm()) return;

    // Verify authentication
    if (!this.authService.isLoggedIn() || !this.authService.getUserId()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.createIsLoading = true;

    const formData = this.prepareFormData();
    formData.append('companyId', this.authService.getUserId()!);

    this.tripService.createTrip(formData).subscribe({
      next: (response) => {
        console.log('Trip created successfully:', response);
        this.createIsLoading = false;
        this.showSuccessMessage('Trip created successfully!');
        this.router.navigate(['/tourguidesdashboard']);
      },
      error: (error) => {
        console.error('Error creating trip:', error);
        this.createIsLoading = false;
        this.showErrorMessage(error);
      },
    });
  }

  // Save as draft
  saveDraft(): void {
    // Check if at least one field has data
    const hasData =
      this.trip.title ||
      this.trip.destinationCountry ||
      this.trip.tourismTypes.length > 0 ||
      this.trip.duration !== null ||
      this.trip.availableDates.some(
        (dateRange) =>
          dateRange.startDate ||
          dateRange.endDate ||
          dateRange.availableSeats !== null ||
          dateRange.budget !== null
      ) ||
      this.trip.description ||
      this.trip.freeCancellationDeadline !== null ||
      this.trip.currency ||
      this.images.some((image) => image.file !== null);

    if (!hasData) {
      alert('Cannot save an empty draft. Please fill in at least one field.');
      return;
    }

    // Verify authentication
    if (!this.authService.isLoggedIn() || !this.authService.getUserId()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    // Verify authentication
    if (!this.authService.isLoggedIn() || !this.authService.getUserId()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    // Set loading state to true
    this.SavingisLoading = true;

    console.log('Form Data to be Sent:', {
      title: this.trip.title,
      destinationCountry: this.trip.destinationCountry,
      tourismTypes: this.trip.tourismTypes,
      duration: this.trip.duration,
      availableDates: this.trip.availableDates,
      description: this.trip.description,
      freeCancellationDeadline: this.trip.freeCancellationDeadline,
      currency: this.trip.currency,
      images: this.images.filter((img) => img.file),
    });

    // Prepare form data
    const draftData = new FormData();
    draftData.append('title', this.trip.title);
    draftData.append('destinationCountry', this.trip.destinationCountry);
    draftData.append('tourismTypes', JSON.stringify(this.trip.tourismTypes));
    if (this.trip.duration !== null) {
      draftData.append('duration', this.trip.duration.toString());
    }
    draftData.append('description', this.trip.description);
    draftData.append(
      'availableDates',
      JSON.stringify(this.trip.availableDates)
    );
    draftData.append(
      'availableDates',
      JSON.stringify(this.trip.availableDates)
    );
    if (this.trip.freeCancellationDeadline !== null) {
      draftData.append(
        'freeCancellationDeadline',
        this.trip.freeCancellationDeadline.toString()
      );
    }
    draftData.append('currency', this.trip.currency);
    draftData.append('tourGuideId', this.authService.getUserId()!);
    draftData.append('isDraft', 'true');

    draftData.append('tourGuideId', this.authService.getUserId()!);
    draftData.append('isDraft', 'true');

    // Append images
    this.images.forEach((image, index) => {
      if (image.file) {
        draftData.append(
          'images',
          image.file,
          `image_${index}.${image.file.type.split('/')[1]}`
        );
      }
    });

    // Send data to backend using the service
    this.tripService.saveDraft(draftData).subscribe({
      next: (response) => {
        console.log('Trip saved as draft successfully:', response);
        this.SavingisLoading = false;
        this.router.navigate(['/tourguidesdashboard']); // Updated to correct dashboard

        // Optional: Show success message
        alert('Draft saved successfully!');
      },
      error: (error) => {
        console.error('Error saving draft:', error);
        this.SavingisLoading = false;

        // Show user-friendly error message
        alert(
          `Error saving draft: ${
            error.error?.message || 'Please try again later.'
          }`
        );
        console.error('Error saving draft:', error);
        this.SavingisLoading = false;

        // Show user-friendly error message
        alert(
          `Error saving draft: ${
            error.error?.message || 'Please try again later.'
          }`
        );
      },
    });
  }
  private showSuccessMessage(message: string): void {
    // You can replace this with a toast notification or other UI feedback
    alert(message);
  }

  private showErrorMessage(error: any): void {
    const errorMessage =
      error.error?.message || 'An error occurred. Please try again.';
    alert(errorMessage);
  }
  // Method to handle logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
// Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }
}
