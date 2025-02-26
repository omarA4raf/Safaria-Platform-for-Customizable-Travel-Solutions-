import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { 'ngSkipHydration': '' }  // This tells Angular to skip the hydration process for this component

})
export class AppComponent {
  title = 'Safaria';
}
