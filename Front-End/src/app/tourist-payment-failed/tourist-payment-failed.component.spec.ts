import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPaymentFailedComponent } from './tourist-payment-failed.component';

describe('TouristPaymentFailedComponent', () => {
  let component: TouristPaymentFailedComponent;
  let fixture: ComponentFixture<TouristPaymentFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPaymentFailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
