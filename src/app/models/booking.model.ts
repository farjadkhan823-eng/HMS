export enum ECtg{
  DELUXE = "Deluxe",
  STANDARD = "Standard",
  SUITE = "Suite"
}

export interface EBooking {
  id: number;
  name: string;
  email: string;
  phone:string;
  roomCtg: ECtg;
  roomQty:number;
  checkIn:string;
  checkOut:string;
}