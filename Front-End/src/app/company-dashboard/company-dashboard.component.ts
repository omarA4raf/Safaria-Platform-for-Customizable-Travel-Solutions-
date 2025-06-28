import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDashboardService } from './company-dashboard.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from '../shared/chat/chat.component';

// shared/models/user-type.enum.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}
@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChatComponent],
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css'],
})
export class CompanyDashboardComponent implements OnInit {
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
    private apiService: CompanyDashboardService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // if (
    //   !this.authService.isLoggedIn() ||
    //   this.authService.getUserType() !== UserType.COMPANY
    // ) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.fetchData();
    // Step 3: Initialize user data (replace with your actual auth logic)
    const currentUser = this.getCurrentUser();
    this.userId = currentUser.id;
    this.userType = currentUser.type as
      | 'tourist'
      | 'guide'
      | 'company'
      | 'admin';
  }

  // Fetch all data from the backend
  fetchData(): void {
    const companyId = this.authService.getUserId();
    if (!companyId) {
      this.authService.logout();
      return;
    }

    this.apiService.getCompanyProfile(companyId).subscribe({
      next: (profile) => {
        this.name = profile.name || 'No Name Provided';
        this.email = profile.email || 'No Email Provided';
        this.country = profile.country || 'No Country Provided';
        this.phone = profile.phone || 'No Phone Provided';
        this.tourismTypes = profile.tourismTypes || [];
        this.rating = profile.rating ?? 5;
        this.about = profile.about || 'No information provided yet.';
        this.profile.image = profile.imageUrl || '';
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      },
    });

    this.apiService.getTrips(companyId).subscribe({
      next: (trips) => (this.trips = trips),
      error: (error) => console.error('Error fetching trips:', error),
    });

    this.apiService.getClients(companyId).subscribe({
      next: (clients) => (this.clients = clients),
      error: (error) => console.error('Error fetching clients:', error),
    });

    this.apiService.getClientReviews(companyId).subscribe({
      next: (reviews) => (this.clientReviews = reviews),
      error: (error) => console.error('Error fetching reviews:', error),
    });
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Method to handle navigation to create a new trip
  navigateToCreateTrip(): void {
    this.router.navigate(['/companycreatetrip']);
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
  // In company-dashboard.component.ts
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const companyId = this.authService.getUserId();
    if (!companyId) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.uploadProfileImage(companyId, file).subscribe({
      next: (response) => {
        this.profile.image = response.imageUrl;
        alert('Profile image updated successfully!');
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to update profile image');
      },
    });
  }
  // Step 4: Add this method (replace with your actual auth logic)
  getCurrentUser() {
    return {
      id: '123', // Get from JWT token or session storage
      type: 'tourist', // Get from your authentication service
    };
  }
}
