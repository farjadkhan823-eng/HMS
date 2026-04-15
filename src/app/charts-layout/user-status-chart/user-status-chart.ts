import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; 
import { UserService } from '../../services/user-service';
Chart.register(...registerables); 

@Component({
  selector: 'app-user-status-chart',
  imports: [],
  templateUrl: './user-status-chart.html',
  styleUrl: './user-status-chart.css',
})
export class UserStatusChart implements OnInit {
 constructor(private users: UserService) {
    
  }
  ngOnInit() {
    this.createDonutChart();
  }

  createDonutChart() {
    const ctx = document.getElementById('myDonutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: ['Active','Inactive'],
        datasets: [{
          label: 'User Data',
          data: [this.users.activeUserLength('active'), this.users.activeUserLength('inactive')], 
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
          title: { display: true, text: 'Active User/ Inactive User' } 
        }
      }
    });
  }
}
