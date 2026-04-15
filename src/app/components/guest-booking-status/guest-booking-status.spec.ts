import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingStatus } from './guest-booking-status';

describe('GuestBookingStatus', () => {
  let component: GuestBookingStatus;
  let fixture: ComponentFixture<GuestBookingStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookingStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookingStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
