import { Component , inject} from '@angular/core';
import { RoomManagement } from '../room-management/room-management';
import { RoomService } from '../../services/room-service';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standard-room-details',
  imports: [CommonModule],
  templateUrl: './standard-room-details.html',
  styleUrl: './standard-room-details.css',
})
export class StandardRoomDetails {

rooms : Room[] = [];


private roomService = inject(RoomService);

ngOnInit(){
  this.load();
}

load() {
    this.rooms = this.roomService.getRooms();
  }
names  = [
  {
  name:'farjad',
  age: 19
}
]
}
