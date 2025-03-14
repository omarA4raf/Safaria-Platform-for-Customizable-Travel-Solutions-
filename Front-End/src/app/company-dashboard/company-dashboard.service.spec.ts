import { TestBed } from '@angular/core/testing';

import { CompanyDashboardService } from './company-dashboard.service';

describe('CompanyDashboardService', () => {
  let service: CompanyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
