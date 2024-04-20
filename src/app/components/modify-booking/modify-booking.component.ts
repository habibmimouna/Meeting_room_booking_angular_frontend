import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ReservationService } from '../../services/reservation.service';
import { MeetingRoomService } from '../../services/meeting-room.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-booking',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './modify-booking.component.html',
  styleUrl: './modify-booking.component.css'
})
export class ModifyBookingComponent {

  constructor(private reservationService: ReservationService,private meetingroomService:MeetingRoomService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let meetingRoomId = params['id'];
      console.log("meetingroom id :",meetingRoomId);
     //this.getMeetingRoomDetails(meetingRoomId);
    });
  }
  

}
