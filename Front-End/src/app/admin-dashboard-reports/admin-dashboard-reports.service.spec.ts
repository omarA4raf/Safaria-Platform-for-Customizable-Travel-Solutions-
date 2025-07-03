import { TestBed } from '@angular/core/testing';

import { AdminDashboardReportsService } from './admin-dashboard-reports.service';

describe('AdminDashboardReportsService', () => {
  let service: AdminDashboardReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
