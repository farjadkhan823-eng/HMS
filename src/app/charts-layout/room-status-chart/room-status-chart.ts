import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; 
import { RoomDetailService } from '../../services/room-detail-service';
Chart.register(...registerables); 

@Component({
  selector: 'app-room-status-chart',
  imports: [],
  templateUrl: './room-status-chart.html',
  styleUrl: './room-status-chart.css',
})
export class RoomStatusChart implements OnInit {
 constructor(private roomDetailsService: RoomDetailService) {
    
  }
  ngOnInit() {
    this.createDonutChart();
  }

  createDonutChart() {
    const ctx = document.getElementById('myRoomChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: ['Booked','Free'],
        datasets: [{
          label: 'Room Data',
          data: [this.roomDetailsService.bookingLength('Booked') , this.roomDetailsService.bookingLength('Free')], 
           backgroundColor: [
            '#C8A94F',
            'rgba(200, 200, 110)'
          ],
          hoverOffset: 4 
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: { display: true }, 
          title: { display: true, text: 'Booked Rooms / Free Rooms' } 
        }
      }
    });
  }
}
