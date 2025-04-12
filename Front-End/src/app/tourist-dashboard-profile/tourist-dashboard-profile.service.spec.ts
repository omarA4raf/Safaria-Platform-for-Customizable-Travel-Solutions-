import { TestBed } from '@angular/core/testing';

import { TouristDashboardProfileService } from './tourist-dashboard-profile.service';

describe('TouristDashboardProfileService', () => {
  let service: TouristDashboardProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristDashboardProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
