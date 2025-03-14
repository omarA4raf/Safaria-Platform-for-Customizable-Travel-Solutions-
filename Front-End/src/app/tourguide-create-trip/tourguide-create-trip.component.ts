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
  isLoading: boolean = false;

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
    availableDates: [{ startDate: null, endDate: null, trips: 1 }],
    description: '',
    availableSeats: null as number | null,
  };

  // List of countries
  countries: string[] = [];

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
    this.trip.availableDates.push({ startDate: null, endDate: null, trips: 1 });
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

    // Validate available seats
    if (!this.trip.availableSeats || this.trip.availableSeats <= 0) {
      this.errorMessages['availableSeats'] =
        'Available seats must be a positive number.';
      isValid = false;
    }

    // Validate description
    if (!this.trip.description) {
      this.errorMessages['description'] = 'Description is required.';
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
      }
    }

    // Validate images
    if (this.images.length === 0 || this.images.every((img) => !img.file)) {
      this.errorMessages['images'] = 'At least one image is required.';
      isValid = false;
    }

    return isValid;
  }

  // Handle form submission
  onSubmit(): void {
    // Validate form inputs
    if (!this.validateForm()) {
      return;
    }

    // Set loading state to true
    this.isLoading = true;

    // Prepare form data
    const formData = new FormData();
    formData.append('title', this.trip.title);
    formData.append('destinationCountry', this.trip.destinationCountry);
    formData.append('tourismTypes', JSON.stringify(this.trip.tourismTypes));
    if (this.trip.duration !== null) {
      formData.append('duration', this.trip.duration.toString());
    }
    if (this.trip.availableSeats !== null) {
      formData.append('availableSeats', this.trip.availableSeats.toString());
    }
    formData.append('description', this.trip.description);
    formData.append('availableDates', JSON.stringify(this.trip.availableDates));

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
        this.isLoading = false;
        this.router.navigate(['/tourguidesdashboard']);
      },
      error: (error) => {
        console.error('Error creating trip:', error);
        this.isLoading = false;
      },
    });
  }

  // Save as draft
  saveDraft(): void {
    const draftData = {
      ...this.trip,
      images: this.images.filter((img) => img.file),
    };
    console.log('Trip saved as draft:', draftData);
    alert('Trip saved as draft successfully!');
  }

  // Method to handle logout
  logout(): void {
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this.router.navigate(['/']); // Navigate to the home page
  }
}
