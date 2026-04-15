
export enum Reason{
FREE = "Free",
Booked = "Booked",
PENDING = "Pending"
}

export interface RoomDetails{
  id: number;
  roomNo: string;
  status: string;
  reason: string;
}