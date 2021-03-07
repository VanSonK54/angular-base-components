import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OTP_SCENARIO } from 'src/app/modules/authentication/components/data/otp.senarios.data';
import { REGEX } from 'src/app/shared/data';
import { confirmValidator } from 'src/app/shared/directives/confirm-validator.directive';
import { registerModelVariable } from 'src/app/shared/global-variables';
import { cellphoneOtp, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { UsernamePossessionValidatorDirective } from '../../directives/username-possession-validator.directive';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private otpService: OtpService,
    private usernamePossessionValidator: UsernamePossessionValidatorDirective,
    private fb: FormBuilder
    ) {}
    
    form: FormGroup= this.fb.group({
      username: ['', Validators.required, this.usernamePossessionValidator.validate],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required, confirmValidator('password')]],
      cellPhone: ['', [Validators.required, Validators.pattern(REGEX.cellphone)]],
      role: ['', Validators.required],
      email: ['', Validators.email]
    });

  loading = false;

  ngOnInit(): void {
    if (registerModelVariable.isFilled()) {
      this.fillFormData();
    }
  }

  fillFormData() {
    this.form.patchValue({
      username: registerModelVariable.data.userName,
      password: registerModelVariable.data.password,
      passwordConfirm: registerModelVariable.data.passwordConfirm,
      cellPhone: registerModelVariable.data.cellPhone,
      role: registerModelVariable.data.role,
      email: registerModelVariable.data.email
    });
  }

  callOtp() {
    if (!this.cellphoneOtpHasSent()) {
      this.requestCellphoneOtp();
    } else if (this.form.controls.email.value && !this.emailOtpHasSent()) {
      this.requestEmailOtp();
    } else {
      this.router.navigate(['/otp']);
    }
  }

  cellphoneOtpHasSent(): boolean {
    let reuslt = cellphoneOtp.data.code && (this.form.controls.cellPhone.value === registerModelVariable.data.cellPhone);
    return Boolean(reuslt);
  }

  emailOtpHasSent(): boolean {
    let reuslt = emailOtp.data.code && (this.form.controls.email.value === registerModelVariable.data.email);
    return Boolean(reuslt);
  }

  requestCellphoneOtp() {

    // Fill otpModelVariable
    otpModelVariable.fill('S', this.form.controls.cellPhone.value, OTP_SCENARIO.confirmCellPhone);

    this.loading = true;
    // Request otp
    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        // File RegisterModelVariable, to hold part 1 of register's data
        registerModelVariable.fillStepOne(this.form.value);
        // Hold cellphonOtp recieved from backend, in otpCode global variable
        cellphoneOtp.data.code = result.otp;

        if (this.form.controls.email.value && !this.emailOtpHasSent()) {
          this.requestEmailOtp();
        } else {
          this.router.navigate(['/otp']);
        }
      }
    }, error => {
      this.loading = false;
    });
  }

  requestEmailOtp() {
    otpModelVariable.fill('S', this.form.controls.email.value, OTP_SCENARIO.confirmEmail);

    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        // Update RegisterModelVariable, if email is changed after otpCode has been sent
        registerModelVariable.fillStepOne(this.form.value);

        // Hold emailOtp recieved from backend, in otpCode global variable
        emailOtp.data.code = result.otp;
        this.router.navigate(['/otp']);
      }
    }, error => {
      this.loading = false;
    });
  }
}
