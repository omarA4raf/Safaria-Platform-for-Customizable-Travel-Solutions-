import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TouristSignUpComponent } from './tourist-sign-up/tourist-sign-up.component';
import { TourGideSignUpComponent } from './tour-gide-sign-up/tour-gide-sign-up.component';
import { CompanySignUpComponent } from './company-sign-up/company-sign-up.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { TourguideDashboardComponent } from './tourguide-dashboard/tourguide-dashboard.component';
import { TouristDashboardHomeComponent } from './tourist-dashboard-home/tourist-dashboard-home.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'signup', component: SignUpComponent }, // sign up route
  { path: 'touristsignup', component: TouristSignUpComponent }, // tourist sign up route
  { path: 'tourguidesignup', component: TourGideSignUpComponent }, // tourguide sign up route
  { path: 'companysignup', component: CompanySignUpComponent }, // company sign up route
  { path: 'companydashboard', component: CompanyDashboardComponent }, // company dashboard route
  { path: 'tourguidesdashboard', component: TourguideDashboardComponent }, // tourguide dashboard route
  { path: 'touristdashboardhome', component: TouristDashboardHomeComponent } // tourist dashboard home route

];