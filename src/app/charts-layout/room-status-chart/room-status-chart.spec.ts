import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStatusChart } from './room-status-chart';

describe('RoomStatusChart', () => {
  let component: RoomStatusChart;
  let fixture: ComponentFixture<RoomStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomStatusChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomStatusChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
