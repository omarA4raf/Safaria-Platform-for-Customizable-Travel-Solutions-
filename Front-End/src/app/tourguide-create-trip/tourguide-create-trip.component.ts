import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tourguide-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tourguide-create-trip.component.html',
  styleUrl: './tourguide-create-trip.component.css',
})
export class TourguideCreateTripComponent {
  constructor(private router: Router, private http: HttpClient) {}

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
    this.initializeCountries();
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

  // Handle form submission
  onSubmit(): void {

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

    // Validate form inputs
    if (!this.validateForm()) {
      return;
    }

    // Set loading state to true
    this.createIsLoading = true;

    // Prepare form data
    const formData = new FormData();
    formData.append('title', this.trip.title);
    formData.append('destinationCountry', this.trip.destinationCountry);
    formData.append('tourismTypes', JSON.stringify(this.trip.tourismTypes));
    if (this.trip.duration !== null) {
      formData.append('duration', this.trip.duration.toString());
    }
    formData.append('description', this.trip.description);
    formData.append('availableDates', JSON.stringify(this.trip.availableDates));
    if (this.trip.freeCancellationDeadline !== null) {
      formData.append(
        'freeCancellationDeadline',
        this.trip.freeCancellationDeadline.toString()
      );
    }
    formData.append('currency', this.trip.currency);

    // Append images
    this.images.forEach((image, index) => {
      if (image.file) {
        formData.append(
          'images',
          image.file,
          `image_${index}.${image.file.type.split('/')[1]}`
        );
      }
    });

    // Send data to backend
    this.http.post('https://your-backend-api.com/trips', formData).subscribe({
      next: (response) => {
        console.log('Trip created successfully:', response);
        this.createIsLoading = false;
        this.router.navigate(['/companydashboard']);
      },
      error: (error) => {
        console.error('Error creating trip:', error);
        this.createIsLoading = false;
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
    draftData.append('availableDates', JSON.stringify(this.trip.availableDates));
    if (this.trip.freeCancellationDeadline !== null) {
      draftData.append(
        'freeCancellationDeadline',
        this.trip.freeCancellationDeadline.toString()
      );
    }
    draftData.append('currency', this.trip.currency);
  
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
  
    // Send data to backend
    this.http.post('https://your-backend-api.com/draftTrips', draftData).subscribe({
      next: (response) => {
        console.log('Trip is saved in draft successfully:', response);
        this.SavingisLoading = false; // Reset loading state
        this.router.navigate(['/companydashboard']);
      },
      error: (error) => {
        console.error('Error saving trip as draft:', error);
        this.SavingisLoading = false; // Reset loading state
      },
    });
  }

  // Method to handle logout
  logout(): void {
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this.router.navigate(['/']); // Navigate to the home page
  }
}
