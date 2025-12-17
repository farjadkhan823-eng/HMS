import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitRoomDetails } from './suit-room-details';

describe('SuitRoomDetails', () => {
  let component: SuitRoomDetails;
  let fixture: ComponentFixture<SuitRoomDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuitRoomDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuitRoomDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
