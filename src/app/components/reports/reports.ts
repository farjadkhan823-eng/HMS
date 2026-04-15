import { Component, OnInit } from '@angular/core';
import { EBooking, ECtg, EStatus } from '../../models/booking.model';
import { BookingService } from '../../services/booking-service';
import { CommonModule } from '@angular/common';
import { BookingStatusChart } from "../../charts-layout/booking-status-chart/booking-status-chart";
import { BookingCtgChart } from "../../charts-layout/booking-ctg-chart/booking-ctg-chart";
import { Counting } from "../../animation/counting/counting";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, BookingStatusChart, BookingCtgChart, Counting],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit{

bookings: EBooking[] = [];
confirmedBookings : EBooking[] = [];
rejectedBookings : EBooking[] = [];
// bookingCtg:ECtg[] = [];
allBookings! : number;
bookingPrice: number = 0;
confirmedBookingsCtg: EBooking[] = [];


constructor(private bookingService : BookingService){}

calculateBookingSum(): void {
  let priceSum = 0;
  for (let i = 0; i < this.confirmedBookings.length; i++) {
    priceSum += this.confirmedBookings[i].price;
  }
  this.bookingPrice = priceSum;
}

ngOnInit(): void {
  this.loadConfirmedBookings(EStatus.CONFIRMED);
  this.loadRejectedBookings(EStatus.REJECTED);
  // this.loadConfirmedBookingsCtg(EStatus.CONFIRMED , ECtg.STANDARD);
  this.load();
}

loadConfirmedBookings(status : EStatus) :void{
this.confirmedBookings = this.bookingService.bookingStatus(status);
this.calculateBookingSum();
this.load();
}

// loadConfirmedBookingsCtg(status: EStatus , ctg : ECtg) : void{
// this.confirmedBookingsCtg = this.bookingService.bookingConfirmedCtg(status && ctg);
// }

loadRejectedBookings(status : EStatus) :void{
this.rejectedBookings = this.bookingService.bookingStatus(status);
this.load();
}

load() {
this.bookings = this.bookingService.getBookings();
}


}
