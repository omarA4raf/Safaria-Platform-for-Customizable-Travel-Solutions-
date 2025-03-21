import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristDashboardProfileComponent } from './tourist-dashboard-profile.component';

describe('TouristDashboardProfileComponent', () => {
  let component: TouristDashboardProfileComponent;
  let fixture: ComponentFixture<TouristDashboardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristDashboardProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristDashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
