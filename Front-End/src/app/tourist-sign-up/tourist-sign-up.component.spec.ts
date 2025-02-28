import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSignUpComponent } from './tourist-sign-up.component';

describe('TouristSignUpComponent', () => {
  let component: TouristSignUpComponent;
  let fixture: ComponentFixture<TouristSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
