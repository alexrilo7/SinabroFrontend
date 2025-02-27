import { Injectable } from '@angular/core';
import { AuthPortService } from '../../../domain/ports/out/authport.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthPortService {

  private apiUrl = 'https://sinabrobackendok.onrender.com/auth'; // Endpoint del backend
  private isAuthenticated = false;
  constructor(private http: HttpClient) { }
  
  logout() {
    localStorage.removeItem('access_token');
    this.isAuthenticated = false;
  }

  registro(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/registro`, body);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
          this.isAuthenticated = true;
        })
      );
  }

  get authenticated(): boolean {
    return this.isAuthenticated;
  }

  set authenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}
