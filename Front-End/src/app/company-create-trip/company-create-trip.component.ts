import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-create-trip.component.html',
  styleUrls: ['./company-create-trip.component.css'],
})
export class CompanyCreateTripComponent {
  constructor(private router: Router, private http: HttpClient) {}

  // Loading state for the submit button
  isLoading: boolean = false;

  // Array to hold uploaded images
  images: { url: string | null; file: File | null }[] = [{ url: null, file: null }];

  // Object to hold trip details
  trip = {
    title: '',
    destination: '',
    duration: null as number | null,
    availableDates: [{ startDate: null, endDate: null, trips: 1 }],
    description: '',
    availableSeats: null as number | null,
  };

  // Error messages
  errorMessages: { [key: string]: string } = {
    title: '',
    destination: '',
    duration: '',
    availableSeats: '',
    description: '',
    availableDates: '',
    images: '',
  };

  // Increment the number of trips for a date range
  incrementTrips(index: number) {
    this.trip.availableDates[index].trips++;
  }

  // Add a new image upload box
  addImageBox() {
    this.images.push({ url: null, file: null });
  }

  // Remove an image
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  // Add a new date range
  addDateRange() {
    this.trip.availableDates.push({ startDate: null, endDate: null, trips: 1 });
  }

  // Trigger file input when the user clicks on an image box
  triggerFileInput(index: number) {
    const fileInput = document.getElementById('fileInput' + index) as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelected(event: Event, index: number) {
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

  // Validate form inputs
  validateForm(): boolean {
    let isValid = true;

    // Reset error messages
    this.errorMessages = {
      title: '',
      destination: '',
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

    // Validate destination
    if (!this.trip.destination) {
      this.errorMessages['destination'] = 'Destination is required.';
      isValid = false;
    }

    // Validate duration
    if (!this.trip.duration || this.trip.duration <= 0) {
      this.errorMessages['duration'] = 'Duration must be a positive number.';
      isValid = false;
    }

    // Validate available seats
    if (!this.trip.availableSeats || this.trip.availableSeats <= 0) {
      this.errorMessages['availableSeats'] = 'Available seats must be a positive number.';
      isValid = false;
    }

    // Validate description
    if (!this.trip.description) {
      this.errorMessages['description'] = 'Description is required.';
      isValid = false;
    }

    // Validate available dates
    if (this.trip.availableDates.length === 0) {
      this.errorMessages['availableDates'] = 'At least one date range is required.';
      isValid = false;
    } else {
      for (let dateRange of this.trip.availableDates) {
        if (!dateRange.startDate || !dateRange.endDate) {
          this.errorMessages['availableDates'] = 'Start and end dates are required for all date ranges.';
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
  onSubmit() {
    // Validate form inputs
    if (!this.validateForm()) {
      return;
    }

    // Set loading state to true
    this.isLoading = true;

    // Prepare form data
    const formData = new FormData();
    formData.append('title', this.trip.title);
    formData.append('destination', this.trip.destination);
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
        formData.append('images', image.file, `image_${index}.${image.file.type.split('/')[1]}`);
      }
    });

    // Send data to backend
    this.http.post('https://your-backend-api.com/trips', formData).subscribe({
      next: (response) => {
        console.log('Trip created successfully:', response);
        console.log('Uploaded Images:', this.images.filter((img) => img.file));
        this.isLoading = false;
        this.router.navigate(['/companydashboard']);
      },
      error: (error) => {
        console.error('Error creating trip:', error);
        this.isLoading = false;
      },
    });
  }

  // Save as draft
  saveDraft() {
    const draftData = {
      ...this.trip,
      images: this.images.filter((img) => img.file),
    };
    console.log('Trip saved as draft:', draftData);
    alert('Trip saved as draft successfully!');
  }

  // Method to handle logout
  logout() {
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this.router.navigate(['/']); // Navigate to the home page
  }
}