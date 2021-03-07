import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationGuard } from 'src/app/core/guards';
import { ValidationMessageModule } from 'src/app/shared/modules';
import { UserService } from 'src/app/shared/services';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ChangePasswordOtpComponent } from './components/change-password-otp/change-password-otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestOtpComponent } from './components/request-otp/request-otp.component';
import { OtpService } from './services/otp.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    RequestOtpComponent,
    ChangePasswordComponent,
    ChangePasswordOtpComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ValidationMessageModule,
    TranslateModule
  ],
  providers: [
    OtpService,
    UserService,
    RegistrationGuard,
  ]
})
export class AuthenticationModule { }
