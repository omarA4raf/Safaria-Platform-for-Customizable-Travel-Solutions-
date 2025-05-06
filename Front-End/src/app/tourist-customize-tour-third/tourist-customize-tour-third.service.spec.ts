import { TestBed } from '@angular/core/testing';

import { TouristCustomizeTourThirdService } from './tourist-customize-tour-third.service';

describe('TouristCustomizeTourThirdService', () => {
  let service: TouristCustomizeTourThirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristCustomizeTourThirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
