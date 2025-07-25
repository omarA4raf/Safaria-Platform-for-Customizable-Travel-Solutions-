import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost:8080/admin';
  private fakeUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 3 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 1 },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 2 }
  ];

  private useFakeData = false;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    if (this.useFakeData) {
      return of([...this.fakeUsers]).pipe(delay(500));
    }
    return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
  }

  deleteUser(id: number, role: string): Observable<void> {
    if (this.useFakeData) {
      this.fakeUsers = this.fakeUsers.filter(user => user.id !== id);
      return of(undefined).pipe(delay(500));
    }
    if (role == "Tourist") { return this.http.delete<void>(`${this.apiUrl}/tourist/delete${id}`); }
    else { return this.http.delete<void>(`${this.apiUrl}/tour-providers/reject${id}`); }

  }

  addUser(user: User): Observable<User> {
    if (this.useFakeData) {
      const newId = Math.max(...this.fakeUsers.map(u => u.id)) + 1;
      const newUser = { ...user, id: newId };
      this.fakeUsers.push(newUser);
      return of(newUser).pipe(delay(500));
    }
    return this.http.post<User>(`${this.apiUrl}/addUser/`, user);
  }

  updateUser(oldUser: any, newUser: User): Observable<any> {
    if (this.useFakeData) {
      const index = this.fakeUsers.findIndex(u => u.id === newUser.id);
      if (index !== -1) {
        // Ensure role is a number
        const updatedUser = {
          ...newUser,
          role: typeof newUser.role === 'string' ? parseInt(newUser.role) : newUser.role
        };
        this.fakeUsers[index] = updatedUser;
        return of(updatedUser).pipe(delay(500));
      }
      return of(newUser).pipe(delay(500));
    }
    return this.http.put(`${this.apiUrl}/UpdateUser/${oldUser.id}/${oldUser.role}`, newUser, { responseType: 'text' });

  }
}