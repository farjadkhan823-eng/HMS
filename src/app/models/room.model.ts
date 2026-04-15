import { RoomDetails } from "./room-details.model";

export enum RoomCtg{
DELUXE = "Deluxe",
STANDARD = "Standard",
SUITE = "Suite"
}

export interface Room{
  id: number;
  room: RoomCtg;
  price: number;
  bed: string;
  window: string;
  smoking: string;
  size:string;
  internet: string;
  ac: string;
  fan: string;
  iron: string;
  fridge: string;
  microwave: string;
  media: string;
  drink: string;
  snack: string;
  skincare: string;
  imgone: string;
  imgtwo: string,
  imgthree: string,
  rooms: RoomDetails[];
}