import { TestBed } from '@angular/core/testing';

import { TouristPaymentSuccessService } from './tourist-payment-success.service';

describe('TouristPaymentSuccessService', () => {
  let service: TouristPaymentSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPaymentSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
