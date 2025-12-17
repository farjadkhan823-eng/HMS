import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeluxRoomDetails } from './delux-room-details';

describe('DeluxRoomDetails', () => {
  let component: DeluxRoomDetails;
  let fixture: ComponentFixture<DeluxRoomDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeluxRoomDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeluxRoomDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
