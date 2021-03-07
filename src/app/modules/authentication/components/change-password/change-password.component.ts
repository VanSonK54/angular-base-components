import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OTP_SCENARIO } from 'src/app/modules/authentication/components/data/otp.senarios.data';
import { ChangePasswordByEmailDTO } from 'src/app/modules/authentication/dto/change-password-by-email.dto';
import { NotificationService } from 'src/app/shared/client-services';
import { confirmValidator } from 'src/app/shared/directives/confirm-validator.directive';
import { cellphoneOtp, correlationIdVariable, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { UserService } from 'src/app/shared/services';
import { ChangePasswordByPhoneDTO } from '../../dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notifService: NotificationService) { }

  form: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required, confirmValidator('password')]],
  });

  loading = false;
  ngOnInit(): void {
  }

  changePassword() {
    this.loading = true;
    let changePasswordModel: ChangePasswordByEmailDTO | ChangePasswordByPhoneDTO;

    if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByCellPhone) {
      changePasswordModel = {
        correlationId: correlationIdVariable.data.id,
        password: this.form.controls.password.value,
        passwordConfirm: this.form.controls.passwordConfirm.value,
        cellPhone: otpModelVariable.data.key,
        cellPhoneOtp: cellphoneOtp.data.code
      }
      this.userService.changePasswordByPhone(changePasswordModel).subscribe((result: any) => {
        if (result.id) {
          this.notifService.showSuccess('Password changed successfully!');
          this.router.navigate(['/login']);
        }
      }, error => {
        this.loading = false;
      });
    } else if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByEmail) {
      changePasswordModel = {
        correlationId: correlationIdVariable.data.id,
        password: this.form.controls.password.value,
        passwordConfirm: this.form.controls.passwordConfirm.value,
        email: otpModelVariable.data.key,
        emailOtp: emailOtp.data.code
      }
      this.userService.changePasswordByEmail(changePasswordModel).subscribe((result: any) => {
        if (result.id) {
          this.notifService.showSuccess('Password changed successfully!');
          this.router.navigate(['/login']);
        }
      }, error => {
        this.loading = false;
      });
    }
  }

  resetAllGlobalVariables() { 
    otpModelVariable.reset();
    cellphoneOtp.reset();
    emailOtp.reset();
  }
}
