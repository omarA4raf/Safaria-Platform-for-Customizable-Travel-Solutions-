import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDashboardService } from './company-dashboard.service'; // Import the service
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, HttpClientModule],
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css'],
})
export class CompanyDashboardComponent implements OnInit {
  // Properties to hold data
  profile: any = {};
  about: string = '';
  trips: any[] = [];
  clients: any[] = [];
  clientReviews: any[] = [];
  rating: number = 5; // Default rating for the company
  showUploadText: boolean = false; // Control visibility of "Upload Picture" text

  constructor(
    private router: Router,
    private apiService: CompanyDashboardService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch all data from the backend
  fetchData(): void {
    this.apiService.getProfile().subscribe((data) => {
      this.profile = data;
    });

    this.apiService.getAbout().subscribe((data) => {
      this.about = data.about;
    });

    this.apiService.getTrips().subscribe((data) => {
      this.trips = data;
    });

    this.apiService.getClients().subscribe((data) => {
      this.clients = data;
    });

    this.apiService.getClientReviews().subscribe((data) => {
      this.clientReviews = data;
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
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.image = e.target.result; // Update the profile image
      };
      reader.readAsDataURL(file);
    }
  }
}