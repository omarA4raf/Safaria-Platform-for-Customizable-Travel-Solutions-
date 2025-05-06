import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from './tourist-dashboard-home.service';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { console } from 'node:inspector';

@Component({
  selector: 'app-tourist-dashboard-home',
  imports: [CommonModule, HttpClientModule, RouterLink],
  standalone: true,
  templateUrl: './tourist-dashboard-home.component.html',
  styleUrls: ['./tourist-dashboard-home.component.css'],
})
export class TouristDashboardHomeComponent implements OnInit {
  trips: any[] = []; // Initialize as empty array

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
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

  fetchData(): void {
    this.apiService.getTrips().subscribe((data) => {
      this.trips = data;
      this.trips.forEach((trip) => {
      this.apiService.getTripImage(trip.tourID).subscribe((image) => {
        const imageUrl = URL.createObjectURL(image);
  trip.image = imageUrl;
      });
      });
    });
  }

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
