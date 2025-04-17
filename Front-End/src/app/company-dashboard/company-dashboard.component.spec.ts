import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDashboardComponent } from './company-dashboard.component'; // ✅ Import CompanyDashboardComponent
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { AppComponent } from '../app.component';

describe('CompanyDashboardComponent', () => {
  let component: CompanyDashboardComponent;
  let fixture: ComponentFixture<CompanyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule, // ✅ Add this here
    CompanyDashboardComponent,
    AppComponent
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
