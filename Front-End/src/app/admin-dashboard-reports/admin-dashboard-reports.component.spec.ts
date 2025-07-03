import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardReportsComponent } from './admin-dashboard-reports.component';

describe('AdminDashboardReportsComponent', () => {
  let component: AdminDashboardReportsComponent;
  let fixture: ComponentFixture<AdminDashboardReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
