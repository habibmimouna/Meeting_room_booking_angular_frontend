import { Component } from '@angular/core';
import { MeetingRoomService } from '../../services/meeting-room.service';
import { MeetingRoom } from '../../models/meetingRoom';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  meetingRooms: MeetingRoom[] = []; 

  constructor(private meetingRoomService:MeetingRoomService,private router:Router) {}
  ngOnInit(){
    this.meetingRoomService.getMeetingRoomList().subscribe((data) => {
      this.meetingRooms = data;
    });

  }
  openReservationPage(meetingroom:MeetingRoom) {
    console.log(meetingroom._id);
    
    this.router.navigate(['/booking',meetingroom._id]); // Navigate to reservation page with meeting room ID
  }
}
