import { Component } from '@angular/core';
import { MeetingRoomService } from '../../services/meeting-room.service';
import { MeetingRoom } from '../../models/meetingRoom';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  meetingRooms: MeetingRoom[] = [];
  newMeetingRoom: MeetingRoom = {
    name: '',
    capacity: 0,
    location: '',
    equipment: '',
  };
  userObject: User = {
    _id: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    username: '',
    isAdmin: false,
  };

  constructor(
    private meetingRoomService: MeetingRoomService,
    private router: Router
  ) {}
  ngOnInit() {
    this.meetingRoomService.getMeetingRoomList().subscribe((data) => {
      this.meetingRooms = data;
    });
    this.getUserFromToken();
  }
  openReservationPage(meetingroom: MeetingRoom) {
    console.log(meetingroom._id);

    this.router.navigate(['/booking', meetingroom._id]);
  }
  deleteMeetingRoom(meetingRoom: MeetingRoom): void {
    const toDelete = window.confirm("Are you sure you want to delete this meeting room?");
    if (toDelete && meetingRoom._id ) {
      this.meetingRoomService.deleteMeetingRoom(meetingRoom._id).subscribe(() => {
        window.alert("Meeting room deleted successfully !")
        console.log("Meeting room deleted successfully");
        window.location.reload()
      });
    }
  }
  getUserFromToken(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.userObject = JSON.parse(currentUser);
    }
  }

  isAdminUser(): boolean {
    console.log('test', this.userObject);

    return !!this.userObject && this.userObject.isAdmin;
  }
  async onBtnAddClicked() {
    await this.meetingRoomService
      .createMeetingRoom(this.newMeetingRoom)
      .subscribe(
        (data) => {
          console.log('meeting room added', data);
          window.location.reload();
        },
        (error) => {
          console.error('Error adding meeting room:', error);
          alert('Oups problem adding meeting room ! try again later ');
        }
      );
  }
}
