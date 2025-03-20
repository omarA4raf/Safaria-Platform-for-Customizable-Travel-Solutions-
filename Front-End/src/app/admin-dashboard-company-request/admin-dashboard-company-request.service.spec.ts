import { TestBed } from '@angular/core/testing';

import { AdminDashboardCompanyRequestService } from './admin-dashboard-company-request.service';

describe('AdminDashboardCompanyRequestService', () => {
  let service: AdminDashboardCompanyRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardCompanyRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
