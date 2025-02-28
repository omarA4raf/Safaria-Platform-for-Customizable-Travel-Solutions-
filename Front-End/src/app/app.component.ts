import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-root',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, RouterModule], // Import necessary modules
  templateUrl: './app.component.html', // Link to the template
  styleUrls: ['./app.component.css'] // Link to the styles
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // Component logic here
};