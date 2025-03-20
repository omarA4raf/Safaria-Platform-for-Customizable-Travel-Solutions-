import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from '../app.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule, // Add CommonModule here
    AppComponent,
    AdminDashboardComponent,
  ],
  providers: [],
})
export class AppModule {}