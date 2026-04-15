import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCtgChart } from './booking-ctg-chart';

describe('BookingCtgChart', () => {
  let component: BookingCtgChart;
  let fixture: ComponentFixture<BookingCtgChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCtgChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCtgChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
