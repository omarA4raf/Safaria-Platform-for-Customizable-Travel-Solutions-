import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristCustomizeTourFirstComponent } from './tourist-customize-tour-first.component';

describe('TouristCustomizeTourFirstComponent', () => {
  let component: TouristCustomizeTourFirstComponent;
  let fixture: ComponentFixture<TouristCustomizeTourFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristCustomizeTourFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristCustomizeTourFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
