import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';  // <-- Add 'Inject' here
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TouristPrepackageShowService } from './tourist-prepackage-show.service';
import { AuthService } from '../services/auth.service'; // Add this import
import { CurrencyFormatPipe } from '../currency.pipe'; // Import the CurrencyFormatPipe

export interface Trip {
  id: number;
  title: string;
  image: string;
  tourProviderName: string;
  rating: number;
  destinationCountry: string;
  destinationCity: string;
  price: {
    amount: number;
    currency: string; // 'USD', 'EUR', 'GBP', etc.
  };
  duration?: string;
}

@Component({
  selector: 'app-tourist-prepackage-show',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, CurrencyFormatPipe],
  templateUrl: './tourist-prepackage-show.component.html',
  styleUrls: ['./tourist-prepackage-show.component.css'],
})
export class TouristPrepackageShowComponent implements OnInit {
  searchQuery: string = '';
  searched: boolean = false;
  filteredTrips: Trip[] = [];
  useFakeData: boolean = true;
  // Add these new properties at the top of the component class
  displayedTrips: Trip[] = [];
  currentPage: number = 1;
  tripsPerPage: number = 8;
  hasMoreTrips: boolean = false;

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
      price: {
        amount: 1200,
        currency: 'EUR',
      },
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
      price: {
        amount: 950,
        currency: 'EUR',
      },
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
      price: {
        amount: 1500,
        currency: 'USD',
      },
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
      price: {
        amount: 1400,
        currency: 'GBP',
      },
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
      price: {
        amount: 1400,
        currency: 'GBP',
      },
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
      price: {
        amount: 1400,
        currency: 'GBP',
      },
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
      price: {
        amount: 1400,
        currency: 'GBP',
      },
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
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '5 days',
    },
    {
      id: 9,
      title: 'Dubai Desert Safari',
      image:
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Arabian Adventures',
      rating: 4.6,
      destinationCountry: 'UAE',
      destinationCity: 'Dubai',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '4 days',
    },
    {
      id: 10,
      title: 'Sydney Coastal Explorer',
      image:
        'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Pacific Voyages',
      rating: 4.7,
      destinationCountry: 'Australia',
      destinationCity: 'Sydney',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '9 days',
    },
    {
      id: 11,
      title: 'Bali Tropical Getaway',
      image:
        'https://images.unsplash.com/photo-1518544866330-95b331ed7cd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Island Paradise Tours',
      rating: 4.8,
      destinationCountry: 'Indonesia',
      destinationCity: 'Bali',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '7 days',
    },
    {
      id: 12,
      title: 'Prague Castle Tour',
      image:
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Eastern Europe Expeditions',
      rating: 4.5,
      destinationCountry: 'Czech Republic',
      destinationCity: 'Prague',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '5 days',
    },
    {
      id: 13,
      title: 'Rio Carnival Experience',
      image:
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Latin American Journeys',
      rating: 4.9,
      destinationCountry: 'Brazil',
      destinationCity: 'Rio de Janeiro',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '6 days',
    },
    {
      id: 14,
      title: 'Swiss Alps Adventure',
      image:
        'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Alpine Explorers',
      rating: 4.7,
      destinationCountry: 'Switzerland',
      destinationCity: 'Zermatt',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '8 days',
    },
    {
      id: 15,
      title: 'Marrakech Souk Discovery',
      image:
        'https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'African Horizons',
      rating: 4.4,
      destinationCountry: 'Morocco',
      destinationCity: 'Marrakech',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '5 days',
    },
    {
      id: 16,
      title: 'Vancouver Nature Escape',
      image:
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Wilderness Treks',
      rating: 4.6,
      destinationCountry: 'Canada',
      destinationCity: 'Vancouver',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '7 days',
    },
    {
      id: 17,
      title: 'Bangkok Street Food Tour',
      image:
        'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Asian Flavors',
      rating: 4.8,
      destinationCountry: 'Thailand',
      destinationCity: 'Bangkok',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '4 days',
    },
    {
      id: 18,
      title: 'Cape Town Panorama',
      image:
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'African Safaris',
      rating: 4.7,
      destinationCountry: 'South Africa',
      destinationCity: 'Cape Town',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '6 days',
    },
    {
      id: 19,
      title: 'Istanbul Crossroads Tour',
      image:
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Eurasian Voyages',
      rating: 4.5,
      destinationCountry: 'Turkey',
      destinationCity: 'Istanbul',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '5 days',
    },
    {
      id: 20,
      title: 'Queenstown Adventure Package',
      image:
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tourProviderName: 'Extreme New Zealand',
      rating: 4.9,
      destinationCountry: 'New Zealand',
      destinationCity: 'Queenstown',
      price: {
        amount: 1400,
        currency: 'GBP',
      },
      duration: '8 days',
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private apiService: TouristPrepackageShowService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Add authentication check
    // if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // Only run this in the browser (not on server)
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('navbar-shrink');
        } else {
          navbar?.classList.remove('navbar-shrink');
        }
      });
    }

    this.filteredTrips = this.fakeTrips;
    this.updateDisplayedTrips(); // Add this line

    
  }

  // Add logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    this.searched = true;
    this.currentPage = 1; // Reset to first page
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
      this.updateDisplayedTrips();
      return;
    }

    const query = this.searchQuery.toLowerCase();

    if (this.useFakeData) {
      // Filter by country only
      this.filteredTrips = this.fakeTrips.filter((trip) =>
        trip.destinationCountry.toLowerCase().includes(query)
      );
      this.updateDisplayedTrips();
    } else {
      this.apiService.searchTripsByCountry(query).subscribe({
        next: (data: Trip[]) => {
          this.filteredTrips = data;
          this.updateDisplayedTrips();
        },
        error: (error) => {
          console.error('Error fetching trips:', error);
          this.filteredTrips = this.fakeTrips.filter((trip) =>
            trip.destinationCountry.toLowerCase().includes(query)
          );
          this.updateDisplayedTrips();
        },
      });
    }
  }

  private updateDisplayedTrips(): void {
    const endIndex = this.currentPage * this.tripsPerPage;
    this.displayedTrips = this.filteredTrips.slice(0, endIndex);
    this.hasMoreTrips = endIndex < this.filteredTrips.length;
  }

  loadMore(): void {
    this.currentPage++;
    this.updateDisplayedTrips();
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
