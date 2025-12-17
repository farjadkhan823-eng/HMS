import { Component, signal,computed } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { EBooking, ECtg } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomCtg } from '../../models/room.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
/// price method start /// 
price = signal(15000);
roomQty = signal(1);
roomDay = signal(1);
totalPrice = computed(() => this.price() * this.roomQty() * this.roomDay());

addQty(){
  this.roomQty.update(q => q + 1);
}
finalPrice(){
 this.roomDay.update(p => p + 1) 
}
/// price method end /// 

  bookings: EBooking[] = [];

  formGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    roomCtg: new FormControl(ECtg.STANDARD),
    roomQty: new FormControl(1, Validators.required),
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required)
  });

  form: EBooking = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    roomCtg: ECtg.STANDARD,
    roomQty: 0,
    checkIn: '',
    checkOut: ''
  };



  editBooking = false;

  constructor(private bookingService: BookingService , private router: Router) {}

  ngOnInit() {
    this.load();
 
  
  
  }

  load() {
    this.bookings = this.bookingService.getBookings();
  }

  save() {
    if (this.editBooking) {
      this.bookingService.updateBooking(this.formGroup.value as EBooking);
    } else {
      this.bookingService.addBooking(this.formGroup.value as EBooking);
    }

    this.reset();
    this.load();
  }

  edit(booking: EBooking) {
    this.editBooking = true;
    this.formGroup.patchValue({ ...booking });
  }

  delete(id: number) {
    this.bookingService.deleteBooking(id);
    this.load();
  }

  reset() {
    this.editBooking = false;
    this.form = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      roomCtg: ECtg.STANDARD,
      roomQty: 1,
      checkIn: '',
      checkOut: ''
    };

    this.formGroup.reset(this.form);
  }

     roomDetails() {
    this.router.navigate(['main/roomDetails/standardRoomDetails']);
  }
}
