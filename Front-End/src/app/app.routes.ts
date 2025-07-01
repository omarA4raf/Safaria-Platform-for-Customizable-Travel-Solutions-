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
import { AdminDashboardTourproviderComponent } from './admin-dashboard-tourprovider/admin-dashboard-tourprovider.component';
import { TouristCustomizeTourFirstComponent } from './tourist-customize-tour-first/tourist-customize-tour-first.component';
import { TouristCustomizeTourSecondComponent } from './tourist-customize-tour-second/tourist-customize-tour-second.component';
import { TouristCustomizeTourThirdComponent } from './tourist-customize-tour-third/tourist-customize-tour-third.component';
import { TouristCustomizeTourFourthComponent } from './tourist-customize-tour-fourth/tourist-customize-tour-fourth.component';
import { TouristPrepackageShowComponent } from './tourist-prepackage-show/tourist-prepackage-show.component';

import { TouristPrepackageSeeTourComponent } from './tourist-prepackage-see-tour/tourist-prepackage-see-tour.component';
import { TouristPrepackagePayTourComponent } from './tourist-prepackage-pay-tour/tourist-prepackage-pay-tour.component';
import { PaymentComponent } from './payment/payment.component';

import { TouristViewTripComponent } from './tourist-view-trip/tourist-view-trip.component';
import { TouristPayTripComponent } from './tourist-pay-trip/tourist-pay-trip.component';
import { TouristPaymentSuccessComponent} from './tourist-payment-success/tourist-payment-success.component';
import { TouristPaymentFailedComponent} from './tourist-payment-failed/tourist-payment-failed.component';
import { TouristBlogigngPageComponent } from './tourist-blogigng-page/tourist-blogigng-page.component';
import { TouristMyBlogigngPageComponent } from './tourist-my-blogigng-page/tourist-my-blogigng-page.component';

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
  {
    path: 'touristdashboardprofile',
    component: TouristDashboardProfileComponent,
  }, // tourist dashboard home route
  { path: 'companycreatetrip', component: CompanyCreateTripComponent }, // company create trip route
  { path: 'tourguidecreatetrip', component: TourguideCreateTripComponent }, // tourguide create trip route
  { path: 'admindashboard', component: AdminDashboardComponent }, // admin dashboard route
  {
    path: 'admindashboardtourprovider',
    component: AdminDashboardTourproviderComponent,
  }, // admin dashboard for tour guide request route
  {
    path: 'touristcustomizetourfirstcomponent',
    component: TouristCustomizeTourFirstComponent,
  }, // tourist customize tour first component route
  {
    path: 'touristcustomizetoursecondcomponent',
    component: TouristCustomizeTourSecondComponent,
  }, // tourist customize tour second component route
  {
    path: 'touristcustomizetourthirdcomponent',
    component: TouristCustomizeTourThirdComponent,
  }, // tourist customize tour third component route
  {
    path: 'touristcustomizetourfourthcomponent',
    component: TouristCustomizeTourFourthComponent,
  }, // tourist customize tour fourth component route
  {
    path: 'touristprepackageshowcomponent',
    component: TouristPrepackageShowComponent,
  }, // tourist prepackage show component route
  {
    path: 'touristviewtripcomponent',
    component: TouristViewTripComponent,
  }, // tourist view trip component route
  {
    path: 'touristpaytripcomponent',
    component: TouristPayTripComponent,
  }, // tourist pay trip component route
  {
    path: 'touristpaymentsuccesscomponent',
    component: TouristPaymentSuccessComponent,
  }, // tourist payment success component route
  {
    path: 'touristpaymentfailedcomponent',
    component: TouristPaymentFailedComponent,
  }, // tourist payment failed component route
  {
    path: 'touristblogigngpagecomponent',
    component: TouristBlogigngPageComponent,
  }, // tourist blogigng page component route
  {

    path: 'touristprepackagepaytourcomponent',
    component: TouristPrepackagePayTourComponent,
  }, // tourist prepackage pay tour component route
  { path: 'payment', component: PaymentComponent },


    path: 'touristmyblogigngpagecomponent',
    component: TouristMyBlogigngPageComponent,
  }, // tourist my blogigng page component route
  
];
