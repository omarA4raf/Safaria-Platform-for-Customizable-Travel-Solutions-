import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse("dsvbsduf76A1xZ9g");
const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class SignUpServices {

  constructor(private http: HttpClient) { }

  encryptAES(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  signup(user: any, role: string): Observable<any> {
    console.log(user)
    if (role === 'Tourist') {
      // JSON for Tourist
      return this.http.post(`${baseUrl}/touristsignup`, user, { responseType: 'text' });
    } else if (role === 'Tour Guide' || role === 'Company') {
      // user is already FormData, send directly
      return this.http.post(
        `${baseUrl}/${role === 'Tour Guide' ? 'tourguidesignup' : 'companysignup'}`,
        user,
        { responseType: 'text' }
      );
    } else {
      throw new Error('Invalid role');
    }
  }}

//       return this.http.post(`${baseUrl}/touristsignup`, user, { responseType: 'text' });}
//     else if(role == 'Tour Guide'){
//       return this.http.post(`${baseUrl}/tourguidesignup`, user, { responseType: 'text' });}
//     else{
//       return this.http.post<any>(`${baseUrl}/companysignup`,user);
//     }
//   };
// };

// tourist@gmail.com
// Team@1234