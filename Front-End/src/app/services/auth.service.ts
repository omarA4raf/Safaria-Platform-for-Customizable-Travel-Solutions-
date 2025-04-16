import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'safaria_auth_token';
  private readonly USER_ID_KEY = 'user_id';
  private readonly USER_TYPE_KEY = 'user_type';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setSession(authResult: { token: string, userId: string, userType: string }): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, authResult.token);
      localStorage.setItem(this.USER_ID_KEY, authResult.userId);
      localStorage.setItem(this.USER_TYPE_KEY, authResult.userType);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  getUserId(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.USER_ID_KEY) : null;
  }

  getUserType(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.USER_TYPE_KEY) : null;
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!this.getToken();
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_ID_KEY);
      localStorage.removeItem(this.USER_TYPE_KEY);
    }
  }
}