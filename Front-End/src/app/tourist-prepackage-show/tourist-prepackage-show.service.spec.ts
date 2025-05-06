import { TestBed } from '@angular/core/testing';

import { TouristPrepackageShowService } from './tourist-prepackage-show.service';

describe('TouristPrepackageShowService', () => {
  let service: TouristPrepackageShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPrepackageShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
