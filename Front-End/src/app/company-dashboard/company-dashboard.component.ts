import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-dashboard',
  standalone: true, // ✅ Add this if using a standalone component
  imports: [CommonModule], // ✅ Import CommonModule
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent {
  trips: { title: string; company: string; rating: number; image: string; }[] = [
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

  editProfile() {
    alert('Edit Profile functionality here!');
  }

  editAbout() {
    alert('Edit About Me functionality here!');
  }

  rating: number = 4.7;
  starsHtml: string = '';

  constructor() {
    this.renderStars(this.rating);
  }

  renderStars(rating: number): void {
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    this.starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
      this.starsHtml += '<i class="bi bi-star-fill text-warning"></i> ';
    }
    if (halfStar) {
      this.starsHtml += '<i class="bi bi-star-half text-warning"></i> ';
    }
    for (let i = 0; i < emptyStars; i++) {
      this.starsHtml += '<i class="bi bi-star text-secondary"></i> ';
    }
  };
      
}
