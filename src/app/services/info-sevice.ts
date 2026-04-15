import { Injectable } from '@angular/core';
import { RoomService } from './room-service';

@Injectable({
  providedIn: 'root',
})
export class InfoSevice {
  private key = 'info';

  constructor (private RoomService : RoomService){}
  getInfo(id : number){
    const infoRoom = this.RoomService.getRooms()
    return infoRoom.find((x)=> x.id === id);
  }
}
