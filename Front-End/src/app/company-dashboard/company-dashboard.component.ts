import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent {

  // Method to handle logout
  logout() {
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    this.router.navigate(['/']); // Navigate to the home page
  };

  // Properties
  rating: number = 5; // Default rating for the company

  // Sample data for trips
  trips: { title: string; company: string; rating: number; image: string }[] = [
    {
      title: '5 days in Cairo',
      company: 'ExploreMore Tours',
      rating: 3.8,
      image: '/assets/img/cairo.jpeg',
    },
    {
      title: '10 days in Paris',
      company: 'ExploreMore Tours',
      rating: 4.8,
      image: '/assets/img/paris.jpeg',
    },
    {
      title: 'Let’s make Omra with us',
      company: 'ExploreMore Tours',
      rating: 4,
      image: '/assets/img/kabaah.jpeg',
    },
    {
      title: '5 days in Cairo',
      company: 'ExploreMore Tours',
      rating: 2.8,
      image: '/assets/img/cairo.jpeg',
    },
    {
      title: '10 days in Paris',
      company: 'ExploreMore Tours',
      rating: 5,
      image: '/assets/img/paris.jpeg',
    },
    {
      title: 'Let’s make Omra with us',
      company: 'ExploreMore Tours',
      rating: 4.8,
      image: '/assets/img/kabaah.jpeg',
    },
  ];

  // Sample data for cleints
  clients: { clientName: string; Address: string; rating: number; image: string }[] = [
    {
      clientName: 'Salma Hussin',
      Address: 'in Egypt, Alexandrai',
      rating: 3.8,
      image: '/assets/img/client 1.jpeg',
    },
    {
      clientName: 'Martin Alexander',
      Address: 'in Egypt, Alexandrai',
      rating: 4.8,
      image: '/assets/img/client 2.jpeg',
    },
    {
      clientName: 'Martin Alexander',
      Address: 'in Egypt, Alexandrai',
      rating: 4,
      image: '/assets/img/client 3.jpeg',
    },
    {
      clientName: 'Salma Hussin',
      Address: 'in Egypt, Alexandrai',
      rating: 2.8,
      image: '/assets/img/client 1.jpeg',
    },
    {
      clientName: 'Martin Alexander',
      Address: 'in Egypt, Alexandrai',
      rating: 5,
      image: '/assets/img/client 2.jpeg',
    },
    {
      clientName: 'Martin Alexander',
      Address: 'in Egypt, Alexandrai',
      rating: 4.8,
      image: '/assets/img/client 3.jpeg',
    },
  ];

  // Sample data for clients and their reviews
  clientReviews = [
    {
      image: '/assets/img/client 2.jpeg', // Path to client image
      name: 'John Doe',
      rating: 4.5,
      review: 'Amazing experience with ExploreMore Tours! Highly recommended.',
    },
    {
      image: '/assets/img/client 3.jpeg',
      name: 'Jane Smith',
      rating: 5,
      review: 'The trip was well-organized and the guides were very knowledgeable.',
    },
    {
      image: '/assets/img/client 1.jpeg',
      name: 'Alice Johnson',
      rating: 2,
      review: 'Great service and friendly staff. Will book again!',
    },
    {
      image: '/assets/img/client 2.jpeg',
      name: 'Bob Brown',
      rating: 3.8,
      review: 'Good experience overall, but some delays in the schedule.',
    },
    {
      image: '/assets/img/client 1.jpeg',
      name: 'Salma Hussin',
      rating: 3,
      review: 'Good experience overall, but some delays in the schedule.',
    },
    {
      image: '/assets/img/client 3.jpeg',
      name: 'Bob Brown',
      rating: 2.8,
      review: 'Good experience overall, but some delays in the schedule.',
    },
  ];

  constructor(private router: Router) {}

  // Method to handle navigation to create a new trip
  navigateToCreateTrip() {
    this.router.navigate(['/companycreatetrip']);
  }

  // Method to handle editing the profile
  editProfile() {
    alert('Edit Profile functionality here!');
  }

  // Method to handle editing the "About Me" section
  editAbout() {
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
}