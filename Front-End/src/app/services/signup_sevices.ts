import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

export type UserRole = 'Tourist' | 'Tour Guide' | 'Company';

@Injectable({
  providedIn: 'root'
})
export class SignUpServices {
  private readonly baseUrl = 'http://localhost:8080/api';
  private readonly encryptionKey = CryptoJS.enc.Utf8.parse("dsvbsduf76A1xZ9g");
  private readonly encryptionIV = CryptoJS.enc.Utf8.parse("1234567890123456");

  constructor(private http: HttpClient) { }

  /**
   * Encrypts sensitive data using AES-CBC with PKCS7 padding
   * @param plainText The text to encrypt
   * @returns Base64 encoded encrypted string
   */
  private encryptAES(plainText: string): string {
    if (!plainText) return '';
    
    try {
      const encrypted = CryptoJS.AES.encrypt(plainText, this.encryptionKey, {
        iv: this.encryptionIV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt sensitive data');
    }
  }

  /**
   * Handles user registration
   * @param userData User data (FormData for Tour Guide/Company, object for Tourist)
   * @param role User role type
   * @returns Observable with registration response
   */
  signup(userData: FormData | any, role: UserRole): Observable<any> {
    if (!userData || !role) {
      return throwError(() => new Error('User data and role are required'));
    }

    try {
      const endpoint = this.getSignupEndpoint(role);
      const options = { responseType: 'text' as const };

      // For Tour Guide and Company, we expect FormData with files
      if (role === 'Tour Guide' || role === 'Company') {
        if (!(userData instanceof FormData)) {
          return throwError(() => new Error('FormData required for this role'));
        }
        /*return this.http.post(`${this.baseUrl}/${endpoint}`, userData, options)
          .pipe(
            catchError(this.handleSignupError)
          );
          */
         if(role == 'Tour Guide') return this.http.post(`${this.baseUrl}/tourguidesignup`,userData,{responseType : 'text'})
         else return this.http.post(`${this.baseUrl}/companysignup`,userData,{responseType : 'text'})

      }
      
      // For Tourist, we expect a regular object
      if (role === 'Tourist') {
        const encryptedData = {
          ...userData,
          password: this.encryptAES(userData.password),
          email: this.encryptAES(userData.email)
        };
       /* return this.http.post(`${this.baseUrl}/${endpoint}`, encryptedData, options)
         
          .pipe(
            catchError(this.handleSignupError)
          );
          */
          return this.http.post(`${this.baseUrl}/touristsignup`,userData,{responseType : 'text'})
      }

      return throwError(() => new Error('Invalid user role'));

    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * Gets the appropriate signup endpoint based on user role
   * @param role User role
   * @returns The signup endpoint string
   */
  private getSignupEndpoint(role: UserRole): string {
    const endpoints = {
      'Tourist': 'touristsignup',
      'Tour Guide': 'tourguidesignup',
      'Company': 'companysignup'
    };
    return endpoints[role];
  }

  /**
   * Handles signup errors and returns user-friendly messages
   * @param error The error object
   * @returns Observable with error
   */
  private handleSignupError(error: any): Observable<never> {
    console.error('Signup error:', error);
    
    let errorMessage = 'Registration failed. Please try again.';
    if (error.status === 400) {
      errorMessage = 'Invalid registration data. Please check your inputs.';
    } else if (error.status === 409) {
      errorMessage = 'User already exists with this email.';
    } else if (error.status === 0) {
      errorMessage = 'Network error. Please check your connection.';
    }

    return throwError(() => new Error(errorMessage));
  }
}