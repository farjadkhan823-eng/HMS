import { Injectable } from '@angular/core';
import { EBooking , ECtg, EStatus} from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  updateBooking(booking: EBooking) {
    throw new Error('Method not implemented.');
  }


  private key = "bookings";
  ECtg = ECtg;
  EStatus = EStatus;


  getBookings() : EBooking[]{
  return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveBooking(list : EBooking[]) {
    localStorage.setItem(this.key ,  JSON.stringify(list));
  }

  addBooking(booking : EBooking){
    let bookings =  this.getBookings()
    booking.id = bookings.length ? bookings[bookings.length -1].id + 1 : 1;
    bookings.push(booking);
    this.saveBooking(bookings);
  }

  // updateBooking(booking : EBooking){
  //   let bookings = this.getBookings();
  //   let findBooking = bookings.findIndex(b => b.id === booking.id);
  //   bookings[findBooking] = booking;
  //   this.saveBooking(bookings)
  // }

  deleteBooking(id : number){
    let bookings = this.getBookings().filter(b => b.id !== id);
    this.saveBooking(bookings)
  }

  toggleBookingStatus(id : number , status : EStatus){
    let bookings = this.getBookings();
    let findBookingIndex = bookings.findIndex(b => b.id === id);
    bookings[findBookingIndex].status = status;
    this.saveBooking(bookings)
  }

  Feedback(id:number, Feedback:string){
  let bookings = this.getBookings();
  let findBookingIndex = bookings.findIndex(b=> b.id === id);
  bookings[findBookingIndex].feedback = Feedback;
  this.saveBooking(bookings);
  }

  bookingStatus(status : EStatus) : EBooking[] {
   return this.getBookings().filter(b  => b.status === status);
  }

  bookingStatusLength(status : EStatus) : number{
    return this.bookingStatus(status).length;
  }


 bookingConfirmedCtg(ctg : ECtg) : EBooking[]{
  return this.getBookings().filter(b => b.roomCtg === ctg);
  }

  bookingConfirmedCtgByStatus(ctg: ECtg): number {
  return this.getBookings().filter(b => b.roomCtg === ctg && b.status === EStatus.CONFIRMED)
  .reduce((sum, b) => sum + Number(b.roomQty), 0);
}
  
// user-BookingService-logics

BookingConfirmedStatus(status: EStatus): EBooking[] {
    return this.getBookings().filter(u => u.status === status);
  }

   BookingConfirmedStatusLength(status : EStatus) : number{
    return this.BookingConfirmedStatus(status).length;
  }


  BookingRejectedStatus(status: EStatus): EBooking[] {
    return this.getBookings().filter(u => u.status === status);
  }

     BookingRejectedStatusLength(status : EStatus) : number{
    return this.BookingRejectedStatus(status).length;
  }

  
  BookingPendingStatus(status: EStatus): EBooking[] {
    return this.getBookings().filter(u => u.status === status);
  }

   BookingPendingStatusLength(status : EStatus) : number{
    return this.BookingPendingStatus(status).length;
  }

  // bookingConfirmedCtgByStatus(ctg : ECtg) : EBooking[]{
  // return this.getBookings().filter(b => b.roomCtg === ctg);
  // }

  // bookingConfirmedCtgByStatusLength(ctg : ECtg ):number{
  //   return this.bookingConfirmedCtg(ctg).length;
  // }


  // bookingPriceSum(price : number) : EBooking[]{
  //   return this.getBookings().filter(b => b.price === price);
  // }

  // bookingPriceSumLength(price : number) : number{
  //   return this.bookingPriceSum(price).length;
  // }
}
