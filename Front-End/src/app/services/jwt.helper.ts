import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtHelper {
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    return decoded?.exp < Date.now() / 1000;
  }
  getUsernameFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || payload.sub || null;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}

}