import { Component,OnInit } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { EStatus,EBooking } from '../../models/booking.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-booking-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-booking-status.html',
  styleUrl: './guest-booking-status.css',
})
export class GuestBookingStatus implements OnInit {

  confirmedBookings: EBooking[] = [];
  rejectedBookings: EBooking[] = [];
  pendingBookings: EBooking[] = [];

  constructor(private bookingService : BookingService){}
  
 ngOnInit(): void {
     this.loadConfirmStatus(EStatus.CONFIRMED);
     this.loadRejectedStatus(EStatus.REJECTED)
     this.loadPendingStatus(EStatus.PENDING);
 }

 loadConfirmStatus(status : EStatus):void{
  this.confirmedBookings = this.bookingService.BookingConfirmedStatus(status);
 }

 loadRejectedStatus(status : EStatus): void{
   this.rejectedBookings = this.bookingService.BookingRejectedStatus(status);
 }

  loadPendingStatus(status : EStatus): void{
   this.pendingBookings = this.bookingService.BookingPendingStatus(status);
 }

 
}
