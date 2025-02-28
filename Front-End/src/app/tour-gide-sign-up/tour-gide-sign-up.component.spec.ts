import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourGideSignUpComponent } from './tour-gide-sign-up.component';

describe('TourGideSignUpComponent', () => {
  let component: TourGideSignUpComponent;
  let fixture: ComponentFixture<TourGideSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourGideSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourGideSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
