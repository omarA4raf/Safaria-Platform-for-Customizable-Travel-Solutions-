import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TouristCustomizeTourFourthService {
  private apiUrl = 'http://localhost:8080/api';
  private _useFakeData = true;

  get useFakeData(): boolean {
    const stored = localStorage.getItem('useFakeData');
    return stored ? JSON.parse(stored) : this._useFakeData;
  }

  set useFakeData(value: boolean) {
    this._useFakeData = value;
    localStorage.setItem('useFakeData', JSON.stringify(value));
  }
  
  constructor(private http: HttpClient, private authService: AuthService) {}
}
