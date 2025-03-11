import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tourist-dashboard-home',
  imports: [CommonModule],
  templateUrl: './tourist-dashboard-home.component.html',
  styleUrl: './tourist-dashboard-home.component.css'
})
export class TouristDashboardHomeComponent {

  trips = [
    {
      title: '5 days in Cairo',
      company: 'WanderSphere Adventures',
      rating: 4.8,
      image: '/assets/images/cairo.jpeg'
    },
    {
      title: '10 days in Paris',
      company: 'WanderSphere Adventures',
      rating: 4.8,
      image: '/assets/images/paris.jpeg'
    },
    {
      title: 'Let\'s make Omra with us',
      company: 'WanderSphere Adventures',
      rating: 4.8,
      image: '/assets/images/kabaah.jpeg'
    }
  ];
}
