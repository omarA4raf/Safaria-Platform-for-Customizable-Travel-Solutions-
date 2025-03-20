import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AdminDashboardTourguideRequestComponent } from './admin-dashboard-tourguide-request.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule, // Add CommonModule here
    AppComponent,
    AdminDashboardTourguideRequestComponent,
  ],
  exports: [AdminDashboardTourguideRequestComponent],
  providers: [],
})
export class AdminDashboardTourguideRequestModule { }
