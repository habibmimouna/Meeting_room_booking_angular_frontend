import { Injectable } from '@angular/core';
import { MeetingRoom } from '../models/meetingRoom';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseURL = 'http://localhost:5000/meeting-Rooms/meeting-rooms';

  constructor(private httpClient: HttpClient) {}
  createMeetingRoom(meetingRoom:MeetingRoom): Observable<Object> {
    let currentToken = localStorage.getItem('userToken') || "";
    const headers= new HttpHeaders().set('Authorization',currentToken);
    return this.httpClient.post(this.baseURL, meetingRoom, { headers: headers });
  }

  deleteMeetingRoom(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getMeetingRoomById(id: string): Observable<MeetingRoom> {
    return this.httpClient.get<MeetingRoom>(`${this.baseURL}/${id}`);
  }
  getMeetingRoomList(): Observable<MeetingRoom[]> {
    return this.httpClient.get<MeetingRoom[]>(`${this.baseURL}`);
  }

  updateMeetingRoom(id: number, meetingRoom: MeetingRoom): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, meetingRoom);
  }
  
}
