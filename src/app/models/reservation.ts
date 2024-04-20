export interface Reservation {
    _id?: string ;
    day: string;
    reservedHours: string[]; 
    purpose: string;
    meetingRoom: string;
    user: string | null;
  }
  