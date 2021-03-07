import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordGuard, RegistrationGuard } from 'src/app/core/guards';
import { ChangePasswordOtpComponent } from './components/change-password-otp/change-password-otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestOtpComponent } from './components/request-otp/request-otp.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'otp',
    component: OtpComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path: 'request-otp',
    component: RequestOtpComponent
  },
  {
    path: 'change-password-otp',
    component: ChangePasswordOtpComponent,
    canActivate: [ChangePasswordGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [ChangePasswordGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
