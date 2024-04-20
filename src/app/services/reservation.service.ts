import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseURL = 'http://localhost:5000/reservations/reservations';

  constructor(private httpClient: HttpClient) {}

  getReservationList(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.baseURL}`);
  }

  createReservation(reservation: Reservation): Observable<Object> {
    let currentToken = localStorage.getItem('userToken') || "";
    const headers= new HttpHeaders().set('Authorization',currentToken);
    return this.httpClient.post(`${this.baseURL}`, reservation, { headers: headers });
  }

  deleteReservation(res:Reservation): Observable<Object> {
    return this.httpClient.delete(this.baseURL, { body: { res } });
  }
  updateReservation(id:string,res:Reservation): Observable<Object> {
    let currentToken = localStorage.getItem('userToken') || '';
    const headers = new HttpHeaders().set('Authorization', currentToken);
    return this.httpClient.put(`${this.baseURL}`, res, {
      headers: headers,
    });
  }
}
