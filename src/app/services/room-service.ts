import { Injectable, signal } from '@angular/core';
import { Room } from '../models/room.model';
import { RoomDetails } from '../components/room-details/room-details';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private key = 'rooms'
  rooms = signal<Room[]>([]);
  
  constructor() {
    this.load();
  }

  getRooms():Room[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveRooms(list:Room[]){
    localStorage.setItem(this.key,JSON.stringify(list));
  }

   addRoom(room : Room){
    let rooms = this.getRooms();
    room.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    room.rooms = [];
    rooms.push(room);
    this.saveRooms(rooms);
    this.load();
   }

   updateRoom(room : Room){
   let rooms = this.getRooms();
   let findRoom = rooms.findIndex(r => r.id === room.id);
   rooms[findRoom] = room;
   this.saveRooms(rooms);
    this.load();
   }

   deleteRoom(id : number){
   let rooms = this.getRooms().filter(r => r.id !== id);
   this.saveRooms(rooms); 
    this.load();
   }

  load() {
    this.rooms.set(this.getRooms());
  }

  getUniqueCtg(): string[]{
   const rooms = this.getRooms();
   return rooms.map(r => r.room);
  }

  getRoomByCtg(ctg : string): Room[]{
    return this.getRooms().filter(r => r.room === ctg);
  }

  getRoomByCtgObj(ctg : string): Room | undefined {
    return this.getRooms().find(r => r.room === ctg);
  }
 
}