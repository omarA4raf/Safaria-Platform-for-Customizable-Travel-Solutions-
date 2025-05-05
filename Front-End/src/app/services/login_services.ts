import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

export type UserRole = 'Tourist' | 'Tour Guide' | 'Company' | 'Admin';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {
  private readonly baseUrl = 'http://localhost:8080/auth/api/login';
  private readonly encryptionKey = CryptoJS.enc.Utf8.parse('dsvbsduf76A1xZ9g'); // 16-byte key
  private readonly encryptionIV = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV

  constructor(private http: HttpClient) { }
  
  /**
   * Encrypts text using AES-CBC with PKCS7 padding
   * @param plainText The text to encrypt
   * @returns Base64 encoded encrypted string
   */
  private encryptAES(plainText: string): string {
    if (!plainText) return '';
    
    try {
      const encrypted = CryptoJS.AES.encrypt(
        plainText, 
        this.encryptionKey, 
        {
          iv: this.encryptionIV,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt credentials');
    }
  }

  /**
   * Performs user login with encrypted credentials
   * @param email User email
   * @param password User password
   * @param role User role
   * @returns Observable with login response
   */
  login(email: string, password: string, role: UserRole): Observable<any> {
    if (!email || !password || !role) {
      return throwError(() => new Error('All credentials are required'));
    }

    try {
      const params = {email,
        password
      }

      const endpoint = this.getLoginEndpoint(role);
      return this.http.post<any>(`${this.baseUrl}/${endpoint}`, params )
        .pipe(
          catchError(error => {
            console.error('Login error:', error);
            return throwError(() => new Error(this.getLoginErrorMessage(error)));
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * Gets the appropriate login endpoint based on user role
   * @param role User role
   * @returns The login endpoint string
   */
  private getLoginEndpoint(role: UserRole): string {
    const endpoints = {
      'Tourist': 'tourist',
      'Tour Guide': 'tourprovider',
      'Company': 'tourprovider',
      'Admin': 'admin'
    };
    return endpoints[role] || 'admin';
  }

  /**
   * Generates user-friendly error messages
   * @param error The error object
   * @returns Formatted error message
   */
  private getLoginErrorMessage(error: any): string {
    if (error.status === 401) {
      return 'Invalid credentials. Please try again.';
    }
    if (error.status === 403) {
      return 'Account not verified. Please check your email.';
    }
    if (error.status === 0) {
      return 'Network error. Please check your connection.';
    }
    return error.error?.message || 'Login failed. Please try again later.';
  }

  /**
   * Refreshes authentication token
   * @returns Observable with new token
   */
  refreshToken(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.baseUrl}/refresh-token`)
      .pipe(
        catchError(error => {
          console.error('Token refresh failed:', error);
          return throwError(() => new Error('Session expired. Please login again.'));
        })
      );
  }
}