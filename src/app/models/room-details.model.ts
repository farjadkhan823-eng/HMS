export enum Reasons {
FREE = "Free",
BOOKED = "Booked",
CLEANING = "Cleaning",
MAINTENANCE = "Maintenance"
}

export interface RoomDetails{
  id: number;
  roomNo: string;
  status : string;
  reason: Reasons;
}