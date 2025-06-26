import { TestBed } from '@angular/core/testing';

import { TouristPaymentFailedService } from './tourist-payment-failed.service';

describe('TouristPaymentFailedService', () => {
  let service: TouristPaymentFailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPaymentFailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
