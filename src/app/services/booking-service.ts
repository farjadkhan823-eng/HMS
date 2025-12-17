import { Injectable } from '@angular/core';
import { EBooking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private key = "bookings";

  getBookings() : EBooking[]{
  return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveBooking(list : EBooking[]) {
    localStorage.setItem(this.key ,  JSON.stringify(list));
  }

  addBooking(booking : EBooking){
    let bookings =  this.getBookings()
    booking.id = bookings.length ? bookings[bookings.length - 1].id +1 : 1;
    bookings.push(booking);
    this.saveBooking(bookings);
  }

  updateBooking(booking : EBooking){
    let bookings = this.getBookings();
    let findBooking = bookings.findIndex(b => b.id === booking.id);
    bookings[findBooking] = booking;
    this.saveBooking(bookings)
  }

  deleteBooking(id : number){
    let bookings = this.getBookings().filter(b => b.id !== id);
    this.saveBooking(bookings)
  }
}
