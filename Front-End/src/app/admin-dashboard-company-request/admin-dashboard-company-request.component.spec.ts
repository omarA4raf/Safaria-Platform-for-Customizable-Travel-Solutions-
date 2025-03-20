import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCompanyRequestComponent  } from './admin-dashboard-company-request.component';

describe('AdminDashboardTourguideRequestComponent', () => {
  let component: AdminDashboardCompanyRequestComponent ;
  let fixture: ComponentFixture<AdminDashboardCompanyRequestComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCompanyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCompanyRequestComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
