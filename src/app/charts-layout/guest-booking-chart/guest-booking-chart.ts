import { Component,OnInit } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { EBooking, EStatus } from '../../models/booking.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-guest-booking-chart',
  standalone: true,
  imports: [],
  templateUrl: './guest-booking-chart.html',
  styleUrl: './guest-booking-chart.css',
})
export class GuestBookingChart implements OnInit{

  userBookings : EBooking[] =[];
  userAllBookings! : number;
  constructor(private bookingService: BookingService) { }

    ngOnInit(): void {
    this.createPieChart();
    this.load();
  }

  load() {
  this.userBookings = this.bookingService.getBookings();
}

  createPieChart() {
  const canvas = document.getElementById('myBarChart') as HTMLCanvasElement;
  if (!canvas) return;

  new Chart(canvas, {
    type: 'doughnut', 
    data: {
      labels: ['Confirmed', 'Rejected', 'Pending'],
      datasets: [{
        label: 'Total Bookings',
        data: [
          this.bookingService.BookingConfirmedStatusLength(EStatus.CONFIRMED),
          this.bookingService.BookingRejectedStatusLength(EStatus.REJECTED),
          this.bookingService.BookingPendingStatusLength(EStatus.PENDING),
        ],
        backgroundColor: ['#A57B0A', '#BF9A33', '#FECE43'],
        hoverOffset: 4 
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          display: true, 
          position: 'bottom' 
        }
      } 
    }
  });
}


}
