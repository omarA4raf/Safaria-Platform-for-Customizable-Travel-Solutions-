import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TourguideDashboardService } from './tourguide-dashboard.service';
import { AuthService } from '../services/auth.service';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-tourguide-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatComponent],
  templateUrl: './tourguide-dashboard.component.html',
  styleUrls: ['./tourguide-dashboard.component.css'],
})
export class TourguideDashboardComponent implements OnInit {
  // Fixed: Set proper user type for tour guide and get actual user ID
  userId: string = '';
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'guide'; // Changed to 'guide'

  // Properties to hold data
  name: string = '';
  email: string = '';
  country: string = '';
  phone: string = '';
  password: string = '';
  tourismTypes: any[] = [];
  rating: number = 5; // Default rating set to 5
  about: string = 'There is no data yet.'; // Default message for About Me
  trips: any[] = []; // Initialize as empty array
  clients: any[] = []; // Initialize as empty array
  clientReviews: any[] = []; // Initialize as empty array
  showUploadText: boolean = false;
  profile: { image: string } = { image: '' }; // Add profile property

  constructor(
    private router: Router,
    private apiService: TourguideDashboardService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fixed: Get actual user ID from auth service or set default
    const authUserId = this.authService.getUserId();
    this.userId = authUserId || 'default-guide-123'; // Set a default if auth fails
    
    console.log('Tour Guide Dashboard initialized with userId:', this.userId);

    // Set the user ID in the API service before making calls
    if (this.apiService.setUserId) {
      this.apiService.setUserId(this.userId);
    }

    // Only fetch data if we have a valid user ID
    if (this.userId) {
      this.fetchData();
    } else {
      console.error('No user ID available');
    }

    // Authentication check (commented out for testing)
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== UserType.GUIDE
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }
  }

  // Fetch all data from the backend
  fetchData(): void {
    // Add error handling to all API calls
    this.apiService.getName().subscribe({
      next: (data) => {
        this.name = data.name || 'No Name Provided';
      },
      error: (error) => {
        console.error('Error fetching name:', error);
        this.name = 'Tour Guide'; // Default value
      }
    });

    this.apiService.getEmail().subscribe({
      next: (data) => {
        this.email = data.email || 'No Email Provided';
      },
      error: (error) => {
        console.error('Error fetching email:', error);
        this.email = 'guide@example.com'; // Default value
      }
    });

    this.apiService.getCountry().subscribe({
      next: (data) => {
        this.country = data.country || 'No Country Provided';
      },
      error: (error) => {
        console.error('Error fetching country:', error);
        this.country = 'Egypt'; // Default value
      }
    });

    this.apiService.getPhoneNumber().subscribe({
      next: (data) => {
        this.phone = data.phone || 'No Phone Number Provided';
      },
      error: (error) => {
        console.error('Error fetching phone:', error);
        this.phone = '+20 123 456 7890'; // Default value
      }
    });

    this.apiService.getPassword().subscribe({
      next: (data) => {
        this.password = data.password || '********';
      },
      error: (error) => {
        console.error('Error fetching password:', error);
        this.password = '********'; // Default value
      }
    });

    this.apiService.getTourismTypes().subscribe({
      next: (data) => {
        this.tourismTypes = data;
      },
      error: (error) => {
        console.error('Error fetching tourism types:', error);
        this.tourismTypes = ['Adventure', 'Cultural']; // Default values
      }
    });

    // Fetch rating, but if the backend returns null/undefined, keep the default value of 5
    this.apiService.getRating().subscribe({
      next: (data) => {
        this.rating = data.rating !== null && data.rating !== undefined ? data.rating : 5;
      },
      error: (error) => {
        console.error('Error fetching rating:', error);
        this.rating = 5; // Default value
      }
    });

    this.apiService.getAbout().subscribe({
      next: (data) => {
        this.about = data.about || 'No information provided yet.';
      },
      error: (error) => {
        console.error('Error fetching about:', error);
        this.about = 'Experienced tour guide specializing in cultural and adventure tours.'; // Default value
      }
    });

    this.apiService.getTrips().subscribe({
      next: (data) => {
        this.trips = data; // Assign data directly (empty array if no data)
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
        this.trips = []; // Default empty array
      }
    });

    this.apiService.getClients().subscribe({
      next: (data) => {
        this.clients = data; // Assign data directly (empty array if no data)
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.clients = []; // Default empty array
      }
    });

    this.apiService.getClientReviews().subscribe({
      next: (data) => {
        this.clientReviews = data; // Assign data directly (empty array if no data)
      },
      error: (error) => {
        console.error('Error fetching client reviews:', error);
        this.clientReviews = []; // Default empty array
      }
    });
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Method to handle navigation to create a new trip
  navigateToCreateTrip(): void {
    this.router.navigate(['/tourguidecreatetrip']);
  }

  // Method to handle editing the profile
  editProfile(): void {
    alert('Edit Profile functionality here!');
  }

  // Method to handle editing the "About Me" section
  editAbout(): void {
    alert('Edit About Me functionality here!');
  }

  // Method to generate star HTML for a given rating
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

  // Method to handle file selection for profile picture
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.apiService.uploadProfileImage(formData).subscribe({
        next: (response) => {
          this.profile.image = response.imageUrl; // Update the profile image URL
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    }
  }
}