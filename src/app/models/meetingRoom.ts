export interface MeetingRoom {
    _id?:string;
    name:string;
    capacity: number|null ;
    location: string ;
    equipment:string;
}