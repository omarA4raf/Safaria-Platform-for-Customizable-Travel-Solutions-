import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from './tourist-dashboard-home.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tourist-dashboard-home',
  imports: [CommonModule, HttpClientModule, RouterLink],
  standalone: true,
  templateUrl: './tourist-dashboard-home.component.html',
  styleUrls: ['./tourist-dashboard-home.component.css'],
})
export class TouristDashboardHomeComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {} // Inject the ApiService
  trips: any[] = []; // Initialize as empty array

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    this.fetchData();
  }

  // Fetch all data from the backend
  fetchData(): void {
    this.apiService.getTrips().subscribe((data) => {
      this.trips = data; // Assign data directly (empty array if no data)
    });
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
}
