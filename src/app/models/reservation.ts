export interface Reservation {
    id: string;
    day: string;
    reservedHours: string[]; 
    purpose: string;
    meetingRoom: string;
    user: string | null;
  }
  