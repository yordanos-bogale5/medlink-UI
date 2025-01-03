import { Routes } from '@angular/router';
import { MainBodyComponent } from './components/landing-page/homepage/main-body.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { SignupComponent } from './components/landing-page/signup/signup.component';
import { DocterRoleComponent } from './components/doctor-page/docter-role/docter-role.component';
import { PatientRoleComponent } from './components/patient-page/patient-role/patient-role.component';

export const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'doctor', component: DocterRoleComponent },
  { path: 'patient', component: PatientRoleComponent },
];
