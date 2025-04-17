import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from '../app.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppComponent, // Import the standalone component
    AdminDashboardComponent, // Import the standalone component
  ],
  providers: [],
})
export class AppModule {}
