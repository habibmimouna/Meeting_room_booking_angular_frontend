import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation';
import { MeetingRoomService } from '../../services/meeting-room.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  currentDate: Date = new Date();
  daysInMonth: Date[] = [];
  availableHours: string[] = [];
  selectedHours: string[] = [];
  selectedYear: number = 0;
  selectedMonth: number = 0;
  selectedDay: string = '';
  meetingRoomId: string = '';
  hasCheckedHours: boolean = false;
  modifyOrCreate: string = 'Create';

  reservation: Reservation = {
    day: this.selectedDay,
    reservedHours: this.selectedHours,
    purpose: '',
    meetingRoom: this.meetingRoomId,
    user: this.getUserIdFromToken(),
  };

  constructor(
    private reservationService: ReservationService,
    private meetingRoomService: MeetingRoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedYear = this.currentDate.getFullYear();
    this.selectedMonth = this.currentDate.getMonth() + 1;
    this.generateDaysInMonth();

    let path = window.location.pathname;
    if (path.includes('/booking/modify')) {
      this.modifyOrCreate = 'modify';
      console.log(this.modifyOrCreate);
      this.route.params.subscribe((params) => {
        this.reservation._id = params['id'];
        console.log(this.reservation._id);
      });
    } else {
      this.modifyOrCreate = 'Create';
      console.log(this.modifyOrCreate);
      this.route.params.subscribe((params) => {
        this.meetingRoomId = params['id'];
        this.reservation.meetingRoom = params['id'];
        console.log(this.reservation._id);
      });
    }

    console.log(this.meetingRoomId);
  }

  generateDaysInMonth(): void {
    this.daysInMonth = [];
    const numDays = new Date(
      this.selectedYear,
      this.selectedMonth,
      0
    ).getDate();
    for (let i = 1; i <= numDays; i++) {
      this.daysInMonth.push(
        new Date(this.selectedYear, this.selectedMonth - 1, i)
      );
    }
  }
  changeMonth(delta: number): void {
    const newDate = new Date(this.selectedYear, this.selectedMonth - 1 + delta);
    this.selectedYear = newDate.getFullYear();
    this.selectedMonth = newDate.getMonth() + 1;
    this.generateDaysInMonth();
  }
  selectDay(day: Date): void {
    const month = (day.getMonth() + 1).toString().padStart(2, '0');
    const dayOfMonth = day.getDate().toString().padStart(2, '0');
    const year = day.getFullYear();
    const formattedDate = `${month}-${dayOfMonth}-${year}`;
    this.selectedDay = formattedDate;
    this.reservation.day = formattedDate;
    console.log(this.selectedDay, this.meetingRoomId);
    this.getAvailableHours();
  }

  async getAvailableHours() {
    try {
      this.meetingRoomService
        .getAvailableHours(this.selectedDay, this.meetingRoomId)
        .subscribe((response: any) => {
          const availableHours = response.availableHours;
          if (Array.isArray(availableHours)) {
            console.log(availableHours);

            this.availableHours = availableHours;
          } else {
            console.error('Available hours is not an array:', availableHours);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  isSelectedHour(hour: string): boolean {
    return this.selectedHours.includes(hour);
  }
  toggleHour(hour: string): void {
    const index = this.selectedHours.indexOf(hour);
    if (index === -1) {
      this.selectedHours.push(hour);
    } else {
      this.selectedHours.splice(index, 1);
    }
    this.updateCheckedStatus();
    console.log(this.selectedHours);
  }
  updateCheckedStatus(): void {
    this.hasCheckedHours = this.selectedHours.length > 0;
  }

  getUserIdFromToken(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const userObject = JSON.parse(currentUser);
        if (userObject && userObject._id) {
          return userObject._id;
        } else {
          console.error('User object does not contain _id field.');
          return null;
        }
      } catch (error) {
        console.error('Error parsing currentUser JSON:', error);
        return null;
      }
    } else {
      console.error('No currentUser found in localStorage.');
      return null;
    }
  }
  async makeReservation() {
    console.log(this.reservation);
    try {
      if (this.modifyOrCreate == 'Create') {
        await this.reservationService
          .createReservation(this.reservation)
          .subscribe(
            (data) => {
              console.error('reservation made with success:', data);
              window.location.reload();
            },
            (error) => {
              
              console.error('Error making reservation:', error);
            
            }
          );
      } else {
        if (this.reservation._id) {
          console.log('reservation to update', this.reservation._id);
          await this.reservationService.updateReservation(this.reservation._id);
        } else {
          console.error('Reservation ID is undefined');
        }
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      
    }
  }
}
