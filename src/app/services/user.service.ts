import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/auth/';
  private authBaseURL = 'http://localhost:5000/auth';

  private readonly USER_KEY = 'currentUser';

  constructor(private httpClient: HttpClient) {}

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL+ 'getAll'}`);
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.authBaseURL}`, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getUsersList().pipe(
      map((users) => users.find((user) => user.email === email))
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}