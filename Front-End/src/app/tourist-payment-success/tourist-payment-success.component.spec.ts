import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPaymentSuccessComponent } from './tourist-payment-success.component';

describe('TouristPaymentSuccessComponent', () => {
  let component: TouristPaymentSuccessComponent;
  let fixture: ComponentFixture<TouristPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPaymentSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
