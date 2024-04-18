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
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate: Date = new Date();
  selectedYear: number = 0;
  selectedMonth: number = 0;
  daysInMonth: Date[] = [];
  selectedDay: string = '';
  meetingRoomId: string = '';

  reservation: Reservation = {
    day: this.selectedDay,
    reservedHours:[], //this.selectedHours,
    purpose: '',
    meetingRoom: "",//this.meetingRoomId,
    user: "",//this.getUserIdFromToken(),
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
    this.route.params.subscribe((params) => {
      this.meetingRoomId = params['id'];
      this.reservation.meetingRoom = params['id'];
    });
    console.log(this.meetingRoomId);
    
    this.meetingRoomService.getAvailableHours(this.selectedDay,this.meetingRoomId).subscribe((data)=>{
      console.log("hello",data);
      
    })
    //this.generateHoursOfDay();
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
    //this.checkReservations(this.selectedDay);
  }

}
