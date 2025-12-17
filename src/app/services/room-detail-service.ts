 import { Injectable , inject} from '@angular/core';
 import { RoomDetails } from '../models/room-details.model';
import { RoomService } from './room-service';
import { Room } from '../models/room.model';
 
 @Injectable({
   providedIn: 'root',
 })

 export class RoomDetailService {
  private key = 'rooms'

  constructor(private roomService: RoomService) {
    
  }

  // private roomService = inject(RoomService)
 
   getRooms(id?: number): RoomDetails[] {
     const catRooms = this.roomService.getRooms();
     return catRooms.find((x) => x.id === id)?.rooms ?? [];
   }
 
   saveRooms(list:RoomDetails[]){
     localStorage.setItem(this.key,JSON.stringify(list));
   }
 
    addRoom(id: number, roomDetails: RoomDetails){
      let roomCategories = this.roomService.getRooms();
      roomCategories.forEach(element => {
        if (element.id === id) {
          roomDetails.id =  element.rooms.length ? element.rooms[element.rooms.length - 1].id + 1 : 1;
          element.rooms?.push(roomDetails);
          return;
        }
      });
      this.roomService.saveRooms(roomCategories);
    }
 
    updateRoom(id: number, roomDetails: RoomDetails){
    let roomCategories = this.roomService.getRooms();
    roomCategories.forEach(element => {
      if (element.id === id) {
        const updatedRooms = element.rooms.map((x) => x.id === roomDetails.id ? roomDetails : x);
        element.rooms = updatedRooms;
        return;
      }
    });
    this.roomService.saveRooms(roomCategories);
    }
 
    deleteRoom(roomCatId: number, id : number){
      let roomCategories = this.roomService.getRooms();
      roomCategories.forEach(element => {
        if (element.id === roomCatId) {
          const deleteRoom = element.rooms.filter((x) => x.id !== id);
          element.rooms = deleteRoom;
          return;
        }
      });
      this.roomService.saveRooms(roomCategories);
    }
 }
 