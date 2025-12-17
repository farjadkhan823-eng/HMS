import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRoomDetails } from './standard-room-details';

describe('StandardRoomDetails', () => {
  let component: StandardRoomDetails;
  let fixture: ComponentFixture<StandardRoomDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRoomDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardRoomDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
