import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyCreateTripService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createTrip(formData: FormData): Observable<any> {
    // Automatically adds companyId via auth interceptor
    return this.http.post(`${this.apiUrl}/tours/create`, formData);
  }

  saveDraft(formData: FormData): Observable<any> {
    // Automatically adds companyId via auth interceptor
    return this.http.post(`${this.apiUrl}/draftTrips`, formData);
  }

  uploadImages(images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image, `image_${index}.${image.name.split('.').pop()}`);
    });
    return this.http.post(`${this.apiUrl}/upload-images`, formData);
  }
}