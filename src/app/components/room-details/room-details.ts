import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-room-details',
  imports: [RouterOutlet],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails {

  constructor(private router : Router) {}
  standard() {
    this.router.navigate(['main/roomDetails/standardRoomDetails']);
  }
   delux() {
    this.router.navigate(['main/roomDetails/deluxRoomDetails']);
  }
   suit() {
    this.router.navigate(['main/roomDetails/suitRoomDetails']);
  }
}
