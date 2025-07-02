import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserType } from '../shared/chat/user-types'; // Import the UserType type from your chat module

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'safaria_auth_token';
  private readonly USER_ID_KEY = 'user_id';
  private readonly USER_TYPE_KEY = 'user_type';
  private readonly USERNAME_KEY= 'username'

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setSession(authResult: {
    token: string;
    userId: string;
    userType: UserType;
    username: string;
  }): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, authResult.token);
      localStorage.setItem(this.USER_ID_KEY, authResult.userId);
      localStorage.setItem(this.USER_TYPE_KEY, authResult.userType);
      localStorage.setItem(this.USERNAME_KEY,authResult.username);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  getUserId(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.USER_ID_KEY) : null;
  }
  getUsername(): string | null{
    return this.isBrowser() ? localStorage.getItem(this.USERNAME_KEY) : null;
  }
  

  getCurrentUser(): { userId: string; userType: UserType } | null {
    if (!this.isBrowser()) return null;

    const userId = this.getUserId();
    const userType = this.getUserType();

    return userId && userType ? { userId, userType } : null;
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
  // In auth.service.ts
  isValidUserType(
    type: string | null
  ): type is 'tourist' | 'guide' | 'company' | 'admin' {
    return ['tourist', 'guide', 'company', 'admin'].includes(type || '');
  }

  getUserType(): UserType | null {
    const type = this.isBrowser()
      ? localStorage.getItem(this.USER_TYPE_KEY)
      : null;
    return (type?.toLowerCase() as UserType) || null;
  }

  getSafeUserType(): UserType {
    return this.getUserType() || ('tourist' as UserType);
  }
}
