import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TouristPrepackageShowService } from './tourist-prepackage-show.service';
import { AuthService } from '../services/auth.service'; // Add this import


interface Trip {
  id: number;
  title: string;
  image: string;
  tourProviderName: string;
  rating: number;
  destinationCountry: string;
  destinationCity: string;
  price?: number;
  duration?: string;
}

@Component({
  selector: 'app-tourist-prepackage-show',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './tourist-prepackage-show.component.html',
  styleUrls: ['./tourist-prepackage-show.component.css'],
})
export class TouristPrepackageShowComponent implements OnInit {
  searchQuery: string = '';
  searched: boolean = false;
  filteredTrips: Trip[] = [];
  useFakeData: boolean = true;

  // Fake data
  private fakeTrips: Trip[] = [
    {
      id: 1,
      title: 'Paris City Tour',
      image:
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Euro Travel Adventures',
      rating: 4.5,
      destinationCountry: 'France',
      destinationCity: 'Paris',
      price: 1200,
      duration: '7 days',
    },
    {
      id: 2,
      title: 'Rome Historical Walk',
      image:
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Ancient World Tours',
      rating: 4.8,
      destinationCountry: 'Italy',
      destinationCity: 'Rome',
      price: 950,
      duration: '5 days',
    },
    {
      id: 3,
      title: 'Barcelona Highlights',
      image:
        'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Mediterranean Experiences',
      rating: 4.2,
      destinationCountry: 'Spain',
      destinationCity: 'Barcelona',
      price: 1100,
      duration: '6 days',
    },
    {
      id: 4,
      title: 'Tokyo Nightlife Tour',
      image:
        'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Asian Discovery Tours',
      rating: 4.9,
      destinationCountry: 'Japan',
      destinationCity: 'Tokyo',
      price: 1800,
      duration: '8 days',
    },
    {
      id: 5,
      title: 'New York City Pass',
      image:
        'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'American Travel Co',
      rating: 4.3,
      destinationCountry: 'USA',
      destinationCity: 'New York',
      price: 1500,
      duration: '7 days',
    },
    {
      id: 6,
      title: 'Cairo Pyramids Adventure',
      image:
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Ancient Wonders Tours',
      rating: 4.7,
      destinationCountry: 'Egypt',
      destinationCity: 'Cairo',
      price: 1300,
      duration: '5 days',
    },
    {
      id: 7,
      title: 'Santorini Sunset Experience',
      image:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Greek Island Tours',
      rating: 4.9,
      destinationCountry: 'Greece',
      destinationCity: 'Santorini',
      price: 1600,
      duration: '6 days',
    },
    {
      id: 8,
      title: 'London Royal Tour',
      image:
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'British Heritage Travel',
      rating: 4.4,
      destinationCountry: 'UK',
      destinationCity: 'London',
      price: 1400,
      duration: '5 days',
    },
  ];

  constructor(
    private apiService: TouristPrepackageShowService,
    private authService: AuthService, // Add AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Add authentication check
    // if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    this.filteredTrips = this.fakeTrips;
    
    // Add scroll listener for navbar if needed
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.custom-navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('navbar-shrink');
      } else {
        navbar?.classList.remove('navbar-shrink');
      }
    });
  }

  // Add logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    this.searched = true;
    this.filterTrips();
  }

  onSearchInputChange(): void {
    if (this.searchQuery.length === 0) {
      this.filteredTrips = this.fakeTrips;
      this.searched = false;
    } else {
      this.filterTrips();
    }
  }

  private filterTrips(): void {
    if (!this.searchQuery) {
      this.filteredTrips = this.fakeTrips;
      return;
    }

    const query = this.searchQuery.toLowerCase();

    if (this.useFakeData) {
      this.filteredTrips = this.fakeTrips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(query) ||
          trip.destinationCountry.toLowerCase().includes(query) ||
          trip.destinationCity.toLowerCase().includes(query)
      );
    } else {
      this.apiService.searchTrips(query).subscribe({
        next: (data: Trip[]) => {
          this.filteredTrips = data;
        },
        error: (error) => {
          console.error('Error fetching trips:', error);
          this.filteredTrips = this.fakeTrips.filter(
            (trip) =>
              trip.title.toLowerCase().includes(query) ||
              trip.destinationCountry.toLowerCase().includes(query) ||
              trip.destinationCity.toLowerCase().includes(query)
          );
        },
      });
    }
  }

  toggleDataSource(): void {
    this.useFakeData = !this.useFakeData;
    if (this.searchQuery) {
      this.filterTrips();
    }
  }

  renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star"></i>';
    }

    return starsHtml;
  }
}
