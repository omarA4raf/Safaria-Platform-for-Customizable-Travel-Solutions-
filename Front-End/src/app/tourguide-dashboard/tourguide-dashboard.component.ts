import { Component } from '@angular/core';

@Component({
  selector: 'app-tourguide-dashboard',
  imports: [],
  templateUrl: './tourguide-dashboard.component.html',
  styleUrl: './tourguide-dashboard.component.css',
})
export class TourguideDashboardComponent {
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
  }

  ngOnInit() {
    this.renderStars(this.rating);
  }
}
