import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { formatDate } from '@angular/common';
const secretKey = CryptoJS.enc.Utf8.parse("dsvbsduf76A1xZ9g");
const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
const baseUrl = 'http://localhost:8080/login';
const httpOptions = {
		  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};


@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  constructor(private http: HttpClient) { }
  
  encryptAES(plainText: string): string {
    // Encrypt using AES CBC mode with PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64); // Return Base64 string
  }

  login(email:string,password:string,role:any): Observable<any> {
    const params = new HttpParams()
        .set('email', encodeURIComponent(this.encryptAES(email))) // Automatically encodes the parameter
        .set('password', encodeURIComponent(this.encryptAES(password)));
    if(role == 'Tourist'){
        return this.http.get<any>(`${baseUrl}/touristlogin/`,{params});}
    else if(role == 'Tour Guide'){
        return this.http.get<any>(`${baseUrl}/tourguidelogin/`,{params});
    }
    else{
        return this.http.get<any>(`${baseUrl}/adminlogin/`,{params});
    }
  }

}
