import { TestBed } from '@angular/core/testing';

import { Logsign } from './logsign';

describe('Logsign', () => {
  let service: Logsign;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Logsign);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
