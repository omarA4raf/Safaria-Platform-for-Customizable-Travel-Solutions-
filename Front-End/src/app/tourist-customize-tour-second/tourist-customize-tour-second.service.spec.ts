import { TestBed } from '@angular/core/testing';

import { TouristCustomizeTourSecondService } from './tourist-customize-tour-second.service';

describe('TouristCustomizeTourSecondService', () => {
  let service: TouristCustomizeTourSecondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristCustomizeTourSecondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
