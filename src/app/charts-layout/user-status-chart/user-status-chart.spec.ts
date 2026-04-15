import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusChart } from './user-status-chart';

describe('UserStatusChart', () => {
  let component: UserStatusChart;
  let fixture: ComponentFixture<UserStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStatusChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
