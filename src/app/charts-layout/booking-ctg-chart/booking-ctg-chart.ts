import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; 
import { BookingService } from '../../services/booking-service';
import { ECtg, EStatus , EBooking } from '../../models/booking.model';
Chart.register(...registerables); 

@Component({
  selector: 'app-booking-ctg-chart',
  imports: [],
  templateUrl: './booking-ctg-chart.html',
  styleUrl: './booking-ctg-chart.css',
})
export class BookingCtgChart implements OnInit{
 
  bookings : EBooking[] =[];
 
  
 constructor(private bookingService : BookingService) {
 }
 
  ngOnInit() {
    this.createPieChart();
    this.load();
  }
load() {
  this.bookings = this.bookingService.getBookings();
}

  createPieChart() {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
      // const booking = this.bookingService.value as EBooking;
    new Chart(ctx, {
      type: 'pie', 
      data: {
        labels: ['Standard','Deluxe', 'Suite'],
        datasets: [{
          label: 'Bookings',
        data: [
                 this.bookingService.bookingConfirmedCtgByStatus(ECtg.STANDARD),
                 this.bookingService.bookingConfirmedCtgByStatus(ECtg.DELUXE),
                 this.bookingService.bookingConfirmedCtgByStatus(ECtg.SUITE),
               ], 
          backgroundColor: [
            '#D4AF37',
            '#996515',
            '#DA9100',
          ],
          hoverOffset: 4 
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: { display: true }, 
          title: { display: true, text: 'Standard Ctg / Deluxe Ctg / Suite Ctg' } 
        }
      }
    });
  }
}
