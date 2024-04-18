import { Component } from '@angular/core';
import { MeetingRoom } from '../../models/meetingRoom';
import { MeetingRoomService } from '../../services/meeting-room.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  MeetingRoomDetails: MeetingRoom = {
    name: '',
    capacity: 0,
    location: '',
    equipment: '',
  };

  constructor(
    private route: ActivatedRoute,
    private meetingRoomService: MeetingRoomService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Param value:', params['id']);
      let meetingRoomId = params['id'];
      console.log(meetingRoomId);

      this.getMeetingRoomDetails(meetingRoomId);
    });
  }

  getMeetingRoomDetails(id: string): void {
    this.meetingRoomService.getMeetingRoomById(id).subscribe(
      (meetingRoom: MeetingRoom) => {
        this.MeetingRoomDetails = meetingRoom;
      },
      (error: any) => {
        console.error('Error fetching meeting room details:', error);
      }
    );
  }

  
}
