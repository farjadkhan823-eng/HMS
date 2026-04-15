import { TestBed } from '@angular/core/testing';

import { InfoSevice } from './info-sevice';

describe('InfoSevice', () => {
  let service: InfoSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
