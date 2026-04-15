import { Component,OnInit,Input,signal } from '@angular/core';

@Component({
  selector: 'app-counting',
  standalone:true,
  imports: [],
  templateUrl: './counting.html',
  styleUrl: './counting.css',
})
export class Counting implements OnInit{
  @Input({ required: true }) targetValue: number = 0;
  @Input() duration: number = 2000;

  displayCount = signal(0);

  ngOnInit() {
    this.animateCount();
  }

  private animateCount() {
    const startTime = performance.now();
    const startValue = 0;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
  
      const currentValue = Math.floor(progress * (this.targetValue - startValue) + startValue);
      
      this.displayCount.set(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
