import { Component, signal, inject } from '@angular/core';
import { RoomService } from '../../services/room-service';
import { Room, RoomCtg } from '../../models/room.model';
import { RoomDetailService } from '../../services/room-detail-service';
import { RoomDetails } from '../../models/room-details.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './room-management.html',
  styleUrl: './room-management.css',
})
export class RoomManagement {
  roomsDetails: RoomDetails[] = [];

  roomForm: FormGroup;
  detailsForm: FormGroup;

  editRoom = false;
  editRoomDetail = false;

  private roomService = inject(RoomService);
  private roomDetailService = inject(RoomDetailService);

  rooms = this.roomService.rooms;
  roomDetailId = signal(0);
  selectedRoomCatRooms = signal(null);

  constructor(private router : Router) {
    this.roomForm = new FormGroup({
      id: new FormControl(0),
      room: new FormControl(RoomCtg.STANDARD),
      price: new FormControl(0),
      bed: new FormControl('Double Bed x '),
      window: new FormControl('No'),
      smoking: new FormControl('No'),
      size: new FormControl('㎡'),
      internet: new FormControl('No'),
      ac: new FormControl('No'),
      fan: new FormControl('No'),
      iron: new FormControl('No'),
      fridge: new FormControl('No'),
      microwave: new FormControl('No'),
      media: new FormControl('No'),
      drink: new FormControl('No'),
      snack: new FormControl('No'),
      skincare: new FormControl('No'),
      imgone: new FormControl(''),
      imgtwo: new FormControl(''),
      imgthree: new FormControl(''),
      rooms: new FormControl([])
    });

    this.detailsForm = new FormGroup({
      id: new FormControl(0),
      roomNo: new FormControl(''),
      status: new FormControl('Active'),
      reason: new FormControl('Booked')
    });
  }

  load2() {
    this.roomsDetails = this.roomDetailService.getRooms(this.roomDetailId());
  }

  save() {
    const data = this.roomForm.value as Room;
    if (this.editRoom) {
      this.roomService.updateRoom(data);
    } else {
      this.roomService.addRoom(data);
    }
    this.reset();
  }

  saveDetails(id: number) {
    const data = this.detailsForm.value as RoomDetails;
    if (this.editRoomDetail) {
      this.roomDetailService.updateRoom(id, data);
    } else {
      this.roomDetailService.addRoom(id, data);
    }
    this.load2();
  }

  edit(room: Room) {
    this.roomForm.patchValue(room);
    this.editRoom = true;
  }

  editDetails(roomDetails: RoomDetails) {
    this.detailsForm.patchValue(roomDetails);
    this.editRoomDetail = true;
  }

  delete(id: number) {
    this.roomService.deleteRoom(id);
  }

  deleteDetail(id: number) {
    this.roomDetailService.deleteRoom(this.roomDetailId(), id, this.detailsForm.value);
    this.load2();
  }

  reset() {
    this.roomForm.reset({
      id: 0,
      room: RoomCtg.STANDARD,
      price: 0,
      bed: '',
      window: '',
      smoking: '',
      size: '',
      internet: '',
      ac: '',
      fan: '',
      iron: '',
      fridge: '',
      microwave: '',
      media: '',
      drink: '',
      snack: '',
      skincare: '',
      imgone: '',
      imgtwo: '',
      imgthree: '',
      rooms: []
    });
    this.editRoom = false;
  }

  resetDetail() {
    this.detailsForm.reset({
      id: 0,
      roomNo: '',
      status: 'Active',
      reason: 'Booked',
    });
    this.editRoomDetail = false;
  }

  setRoomCatIdInRoomDetail(id: number) {
    this.roomDetailId.set(id);
    this.load2();
  }

  roomDetails() {
     this.router.navigate(['main/roomDetails']); 
  }

}
