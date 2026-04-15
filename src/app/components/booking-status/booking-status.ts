import { Component,OnInit } from '@angular/core';
import { RoomDetails } from '../../models/room-details.model';
import { RoomDetailService } from '../../services/room-detail-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-booking-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-status.html',
  styleUrl: './booking-status.css',
})
export class BookingStatus implements OnInit{

    activeBooking: RoomDetails[] = [];
    inactiveBooking: RoomDetails[] = [];

    constructor(private roomDetailService : RoomDetailService){}

    ngOnInit(): void {
      this.loadActiveBooking('Booked');
      this.loadInactiveBooking('Free');
    }

    loadActiveBooking(reason : string):void{
      this.activeBooking = this.roomDetailService.bookingActiveStatus(reason);
      // console.log(this.activeBooking)
    }
  
    loadInactiveBooking(reason : string):void{
      this.inactiveBooking = this.roomDetailService.bookingActiveStatus(reason);
      // console.log(this.inactiveBooking)
    }


}
