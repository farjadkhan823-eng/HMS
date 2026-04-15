import { Injectable } from '@angular/core';
import { RoomDetails } from '../models/room-details.model';
import { RoomService } from './room-service';

@Injectable({
  providedIn: 'root',
})
export class RoomDetailService {
  private key = 'rooms';

  constructor(private roomService: RoomService) {}

  getRooms(id?: number): RoomDetails[] {
    const catRooms = this.roomService.getRooms();
    return catRooms.find(x => x.id === id)?.rooms ?? [];
  }

  saveRooms(list: RoomDetails[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  addRoom(id: number, roomDetails: RoomDetails) {
    let roomCategories = this.roomService.getRooms();
    roomCategories.forEach(element => {
      if (element.id === id) {
        roomDetails.id = element.rooms.length ? element.rooms[element.rooms.length - 1].id + 1 : 1;
        element.rooms?.push(roomDetails);
        return;
      }
    });
    this.roomService.saveRooms(roomCategories);
  }

  updateRoom(id: number, roomDetails: RoomDetails) {
    let roomCategories = this.roomService.getRooms();
    roomCategories.forEach(element => {
      if (element.id === id) {
        element.rooms = element.rooms.map(x => x.id === roomDetails.id ? roomDetails : x);
        return;
      }
    });
    this.roomService.saveRooms(roomCategories);
  }

  deleteRoom(roomCatId: number, id: number, details: RoomDetails) {
    let roomCategories = this.roomService.getRooms();
    roomCategories.forEach(element => {
      if (element.id === roomCatId) {
        element.rooms = element.rooms.filter(x => x.id !== id);
        return;
      }
    });
    this.roomService.saveRooms(roomCategories);
  }

 bookingActiveStatus(reason: string): RoomDetails[] {
  // console.log(reason)
  // console.log(this.getRooms())
    const catRooms = this.roomService.getRooms().flatMap((room)=> {
      return room.rooms;
    });
    return catRooms.filter(r => r.reason === reason);
   }

bookingLength(reason : string): number{
return this.bookingActiveStatus(reason).length
}

getFreeRoomsByCtg(ctg: string): RoomDetails[] {
  const cat = this.roomService.getRoomByCtgObj(ctg);
  if (!cat) return [];
  return cat.rooms.filter(r => r.reason === 'Free');
}

updateRoomReason(ctg: string, roomNo: string, newReason: string) {
  let rooms = this.roomService.getRooms();
  rooms.forEach(cat => {
    if (cat.room === ctg) {
      cat.rooms.forEach(r => { if (r.roomNo === roomNo) { r.reason = newReason; }
      });
    }});
  this.roomService.saveRooms(rooms);
}

resetPendingRooms(roomCtg: string, roomNumbers: string[]) {
  roomNumbers.forEach(rn => {
    this.updateRoomReason(roomCtg, rn, 'Free');
  });
}


}


