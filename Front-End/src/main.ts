import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ✅ Import your routes

bootstrapApplication(AppComponent, appConfig) // Bootstrap the app with the config
  .catch((err) => console.error(err));
