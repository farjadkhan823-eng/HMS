import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingChart } from './guest-booking-chart';

describe('GuestBookingChart', () => {
  let component: GuestBookingChart;
  let fixture: ComponentFixture<GuestBookingChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookingChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookingChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
