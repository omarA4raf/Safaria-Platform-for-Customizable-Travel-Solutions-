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
import { TouristDashboardProfileComponent } from './tourist-dashboard-profile/tourist-dashboard-profile.component';
import { CompanyCreateTripComponent } from './company-create-trip/company-create-trip.component';
import { TourguideCreateTripComponent } from './tourguide-create-trip/tourguide-create-trip.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardTourguideRequestComponent } from './admin-dashboard-tourguide-request/admin-dashboard-tourguide-request.component';
import { AdminDashboardCompanyRequestComponent } from './admin-dashboard-company-request/admin-dashboard-company-request.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'signup', component: SignUpComponent }, // sign up route
  { path: 'touristsignup', component: TouristSignUpComponent }, // tourist sign up route
  { path: 'tourguidesignup', component: TourGideSignUpComponent }, // tourguide sign up route
  { path: 'companysignup', component: CompanySignUpComponent }, // company sign up route
  { path: 'companydashboard', component: CompanyDashboardComponent }, // company dashboard route
  { path: 'tourguidesdashboard', component: TourguideDashboardComponent }, // tourguide dashboard route
  { path: 'touristdashboardhome', component: TouristDashboardHomeComponent }, // tourist dashboard home route
  { path: 'touristdashboardprofile', component: TouristDashboardProfileComponent }, // tourist dashboard home route
  { path: 'companycreatetrip', component: CompanyCreateTripComponent }, // company create trip route
  { path: 'tourguidecreatetrip', component: TourguideCreateTripComponent }, // tourguide create trip route
  { path: 'admindashboard', component: AdminDashboardComponent }, // admin dashboard route
  {
    path: 'admindashboardcompanyrequest',
    component: AdminDashboardCompanyRequestComponent,
  }, // admin dashboard for company request route
  {
    path: 'admindashboardtourguiderequest',
    component: AdminDashboardTourguideRequestComponent,
  }, // admin dashboard for tour guide request route
];
