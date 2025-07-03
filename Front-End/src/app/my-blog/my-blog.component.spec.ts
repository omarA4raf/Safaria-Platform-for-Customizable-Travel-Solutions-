import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogComponent } from './my-blog.component';

describe('MyBlogComponent', () => {
  let component: MyBlogComponent;
  let fixture: ComponentFixture<MyBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
