import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-customize-tour-first',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tourist-customize-tour-first.component.html',
  styleUrl: './tourist-customize-tour-first.component.css'
})
export class TouristCustomizeTourFirstComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn() || this.authService.getUserType() !== 'TOURIST') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}