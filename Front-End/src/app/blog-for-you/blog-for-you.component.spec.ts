import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogForYouComponent } from './blog-for-you.component';

describe('BlogForYouComponent', () => {
  let component: BlogForYouComponent;
  let fixture: ComponentFixture<BlogForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogForYouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
