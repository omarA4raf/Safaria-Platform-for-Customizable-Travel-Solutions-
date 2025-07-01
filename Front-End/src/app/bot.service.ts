import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Tourist } from './objects/Tourist';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  private botUrl = environment.botUrl;
  private signupUrl = `${environment.apiUrl}/signup`;

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.botUrl, {
      message: userMessage,
    });
  }

  signup(tourist: Tourist, userType: string): Observable<any> {
    return this.http.post(this.signupUrl, tourist);
  }
}
