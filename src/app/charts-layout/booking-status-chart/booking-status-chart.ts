import { Component, OnInit } from '@angular/core';
import { EBooking, EStatus } from '../../models/booking.model';
import { Chart, registerables } from 'chart.js';
import { BookingService } from '../../services/booking-service';
Chart.register(...registerables);

@Component({
  selector: 'app-booking-status-chart',
  standalone: true,
  imports: [],
  templateUrl: './booking-status-chart.html',
  styleUrl: './booking-status-chart.css',
})
export class BookingStatusChart implements OnInit {

  bookings : EBooking[] =[];
  allBookings! : number;
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.createBarChart();
    this.load();
    // this.allBookings = this.bookingService.bookingStatusLength(EStatus.CONFIRMED) + this.bookingService.bookingStatusLength(EStatus.REJECTED);
  }

  load() {
  this.bookings = this.bookingService.getBookings();
}

  createBarChart() {
    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: ['Total', 'Confirmed', 'Rejected'], 
        datasets: [{
          label: 'Total Bookings',
          data: [this.allBookings = this.bookingService.bookingStatusLength(EStatus.CONFIRMED) + this.bookingService.bookingStatusLength(EStatus.REJECTED),
            this.bookingService.bookingStatusLength(EStatus.CONFIRMED) , this.bookingService.bookingStatusLength(EStatus.REJECTED)],
          backgroundColor: [
            '#A57B0A',
            '#BF9A33',
            '#FECE43'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }, 
          title: { display: false, text: 'Bookings Ratio' }
        },
        scales: {
          y: {
            beginAtZero: true 
          }
        }
      }
    });
  }
}
