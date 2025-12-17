import { Component, signal, computed, inject } from '@angular/core';
import { RoomService } from '../../services/room-service';
import { Room, RoomCtg } from '../../models/room.model';
import { RoomDetailService } from '../../services/room-detail-service';
import { RoomDetails, Reasons } from '../../models/room-details.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './room-management.html',
  styleUrl: './room-management.css',
})
export class RoomManagement {
  roomsDetails: RoomDetails[] = [];


  form: Room = {
    id: 0,
    room: RoomCtg.STANDARD,
    price: 0,
    bed: 'Double Bed x ',
    window: 'No',
    smoking: 'No',
    size: '㎡',
    internet: 'No',
    ac: 'No',
    fan: 'No',
    iron: 'No',
    fridge: 'No',
    microwave: 'No',
    media: 'No',
    drink: 'No',
    snack: 'No',
    skincare: 'No',
    imgone: '',
    imgtwo: '',
    rooms: []
  };

  details: RoomDetails = {
    id: 0,
    roomNo: '',
    status: 'Active',
    reason: Reasons.FREE
  };

  editRoom = false;
  editRoomDetail = false;

  // constructor(private roomService : RoomService , private roomDetailService : RoomDetailService){}
  private roomService = inject(RoomService)
  private roomDetailService = inject(RoomDetailService)
  rooms = this.roomService.rooms;
  roomDetailId = signal(0);
  selectedRoomCatRooms = signal(null);

  ngOnInit() {
  }

  load2() {
    this.roomsDetails = this.roomDetailService.getRooms(this.roomDetailId());
  }

  save() {
    if (this.editRoom) {
      this.roomService.updateRoom(this.form);
    } else {
      this.roomService.addRoom(this.form);
    }
    this.reset();
  }
  saveDetails(id: number) {
    if (this.editRoomDetail) {
      this.roomDetailService.updateRoom(id, this.details);
    } else {
      this.roomDetailService.addRoom(id, this.details);
    }
    // this.reset();
    this.load2();
  }
  edit(room: Room) {
    this.form = { ...room };
    this.editRoom = true;
  }

  editDetails(roomDetails: RoomDetails) {
    this.details = { ...roomDetails };
    this.editRoomDetail = true;
  }

  delete(id: number) {
    this.roomService.deleteRoom(id);
  }

  deleteDetail(id: number) {
    this.roomDetailService.deleteRoom(this.roomDetailId(), id);
    this.load2();
  }


  reset() {
    this.form = { id: 0, room: RoomCtg.STANDARD, price: 0, bed: '', window: '', smoking: '', size: '', internet: '', ac: '', fan: '', iron: '', fridge: '', microwave: '', media: '', drink: '', snack: '', skincare: '', imgone: '',
    imgtwo: '',rooms: [] };
    this.editRoom = false;
  }

  resetDetail() {
    this.details = {
      id: 0, roomNo: '', status: 'Active', reason: Reasons.FREE
    };
    this.editRoomDetail = false;
  }

  setRoomCatIdInRoomDetail(id: number) {
    this.roomDetailId.set(id);
    this.load2();
  }
}











// roomPrice = signal(5000);
// roomQty = signal(1);
// perDay = signal(1);
// totalPrice = computed(() => this.roomPrice() * this.roomQty() * this.perDay());


// addQty(){
//   this.roomQty.update(q => q + 1);
// }
// finalPrice(){
//  this.perDay.update(p => p + 1)
// }