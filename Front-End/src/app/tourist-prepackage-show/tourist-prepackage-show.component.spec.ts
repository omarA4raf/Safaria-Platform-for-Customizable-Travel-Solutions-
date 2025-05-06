import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPrepackageShowComponent } from './tourist-prepackage-show.component';

describe('TouristPrepackageShowComponent', () => {
  let component: TouristPrepackageShowComponent;
  let fixture: ComponentFixture<TouristPrepackageShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPrepackageShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPrepackageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
