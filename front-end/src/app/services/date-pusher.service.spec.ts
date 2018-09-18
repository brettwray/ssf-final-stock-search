import { TestBed } from '@angular/core/testing';

import { DatePusherService } from './date-pusher.service';

describe('DatePusherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatePusherService = TestBed.get(DatePusherService);
    expect(service).toBeTruthy();
  });
});
