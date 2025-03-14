import { TestBed } from '@angular/core/testing';

import { CompanyCreateTripService } from './company-create-trip.service';

describe('CompanyCreateTripService', () => {
  let service: CompanyCreateTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCreateTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
