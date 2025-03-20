import { Injectable } from '@angular/core';

interface User {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
  role: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

}
