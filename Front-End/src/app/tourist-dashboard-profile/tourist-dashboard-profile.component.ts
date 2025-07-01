import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TouristDashboardProfileService } from './tourist-dashboard-profile.service';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-tourist-dashboard-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatComponent],
  templateUrl: './tourist-dashboard-profile.component.html',
  styleUrl: './tourist-dashboard-profile.component.css',
})
export class TouristDashboardProfileComponent implements OnInit {
  // Step 2: Add these required properties
  userId = '123'; // Replace with actual user ID from your auth service
  userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist'; // Replace with actual user type from your auth service

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
    private apiService: TouristDashboardProfileService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID
  ) {}

  ngOnInit(): void {
    // Uncomment and use your authentication logic if needed
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== 'TOURIST'
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';

    this.fetchData();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('navbar-shrink');
        } else {
          navbar?.classList.remove('navbar-shrink');
        }
      });
    }
  }

  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }
  // Fetch all data from the backend
  fetchData(): void {
    this.apiService.getName().subscribe((data) => {
      this.name = data.name || 'No Name Provided';
    });

    this.apiService.getEmail().subscribe((data) => {
      this.email = data.email || 'No Email Provided';
    });

    this.apiService.getCountry().subscribe((data) => {
      this.country = data.country || 'No Country Provided';
    });

    this.apiService.getPhoneNumber().subscribe((data) => {
      this.phone = data.phone || 'No Phone Number Provided';
    });

    this.apiService.getPassword().subscribe((data) => {
      this.password = data.password || '********';
    });

    this.apiService.getTourismTypes().subscribe((data) => {
      this.tourismTypes = data;
    });

    // Fetch rating, but if the backend returns null/undefined, keep the default value of 5
    this.apiService.getRating().subscribe((data) => {
      this.rating =
        data.rating !== null && data.rating !== undefined ? data.rating : 5;
    });

    this.apiService.getAbout().subscribe((data) => {
      this.about = data.about || 'No information provided yet.';
    });

    this.apiService.getTrips().subscribe((data) => {
      this.trips = data; // Assign data directly (empty array if no data)
    });

    this.apiService.getClients().subscribe((data) => {
      this.clients = data; // Assign data directly (empty array if no data)
    });

    this.apiService.getClientReviews().subscribe((data) => {
      this.clientReviews = data; // Assign data directly (empty array if no data)
    });
  }

  // Method to handle logout
  logout(): void {
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this.router.navigate(['/']); // Navigate to the home page
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

      this.apiService.uploadProfileImage(formData).subscribe((response) => {
        this.profile.image = response.imageUrl; // Update the profile image URL
      });
    }
  }
}
