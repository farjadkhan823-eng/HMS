import { Component } from '@angular/core';
import { UserStatus } from '../user-status/user-status';
import { BookingStatus } from '../booking-status/booking-status';
import { UserService } from '../../services/user-service';
import { RoomDetailService } from '../../services/room-detail-service';
import { UserStatusChart } from '../../charts-layout/user-status-chart/user-status-chart';
import { RoomStatusChart } from '../../charts-layout/room-status-chart/room-status-chart';
import { GuestBookingStatus } from "../guest-booking-status/guest-booking-status";
import { GuestBookingChart } from "../../charts-layout/guest-booking-chart/guest-booking-chart";


@Component({
  selector: 'app-dashboard',
  imports: [BookingStatus, UserStatus, UserStatusChart, RoomStatusChart, GuestBookingStatus, GuestBookingChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

 activeLength!:number;
 inactiveLength!:number;
 bookedBookingLength!: number;
 freeBookingLength!: number;
 pendingBookingLength!: number;
 allRooms! : number;

constructor(private userService: UserService , private roomDetailService:RoomDetailService) {}

ngOnInit() {
  this.activeLength = this.userService.activeUserLength('active');
  this.inactiveLength = this.userService.activeUserLength('inactive');

  this.bookedBookingLength = this.roomDetailService.bookingLength('Booked');
  this.freeBookingLength = this.roomDetailService.bookingLength('Free');
  this.pendingBookingLength = this.roomDetailService.bookingLength('Pending');
  this.allRooms = this.bookedBookingLength + this.freeBookingLength + this.pendingBookingLength;
}
  
  

}

