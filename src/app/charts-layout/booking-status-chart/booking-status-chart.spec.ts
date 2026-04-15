import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusChart } from './booking-status-chart';

describe('BookingStatusChart', () => {
  let component: BookingStatusChart;
  let fixture: ComponentFixture<BookingStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingStatusChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
