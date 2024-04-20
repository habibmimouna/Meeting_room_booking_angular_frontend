import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'userToken';
  private AuthURL = 'http://localhost:5000/auth/';

  constructor(private httpClient: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    return this.httpClient
      .post<{ token: string; user: User }>(this.AuthURL + 'login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          console.log('Login response:', response);
          if (response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem('userInfo', JSON.stringify(response.user));
            console.log('User info stored:', response.user);
          } else {
            console.log('user:', response.user);
            console.log('token', response.token);
            console.error('Login response missing token or user info');
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    this.clearUserInfo();
  }

  signup(user: User): Observable<Object> {
    return this.httpClient.post(`${this.AuthURL + 'register'}`, user);
  }
  getUserInfo(): User | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  clearUserInfo(): void {
    localStorage.removeItem('userInfo');
  }
}
