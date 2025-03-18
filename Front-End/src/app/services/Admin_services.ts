import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import { formatDate } from '@angular/common';

const baseUrl = 'http://localhost:8080/admin';
const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

// Team@1234
@Injectable({
  providedIn: 'root'
})
export class SignUpServices {

  constructor(private http: HttpClient) { }
  
  getPendingProviders(){
    return this.http.get<any>(`${baseUrl}/getPendingProviders/`);
  }
  deleteTourProvider(id:any):Observable<any>{
    return this.http.delete<any>(`${baseUrl}/deleteTourProvider/${id}`);
  }
  approveTourProvider(id:any):Observable<any>{
    return this.http.post(`${baseUrl}/approveTourProvider/${id}`,{ responseType: 'text' });
  }

};


// tourist@gmail.com
// Team@1234