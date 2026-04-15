export enum ECtg{
  DELUXE = "Deluxe",
  STANDARD = "Standard",
  SUITE = "Suite"
}

export enum EStatus{
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  REJECTED = "REJECTED"
}

export interface EBooking {
  id: number;
  name: string;
  phone: number;
  email:string;
  roomCtg: ECtg;
  roomQty: number;
  checkIn: string;
  checkOut: string;
  days: number;
  price: number;
  status : EStatus;
  feedback: string;
  timing:number;
  roomNumbers: string[];
}
