import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourguideDashboardComponent } from './tourguide-dashboard.component';

describe('TourguideDashboardComponent', () => {
  let component: TourguideDashboardComponent;
  let fixture: ComponentFixture<TourguideDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourguideDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourguideDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
