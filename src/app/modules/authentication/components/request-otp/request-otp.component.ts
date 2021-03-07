import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OTP_SCENARIO } from 'src/app/modules/authentication/components/data/otp.senarios.data';
import { REGEX } from 'src/app/shared/data';
import { phoneOrEmailValidator } from 'src/app/shared/directives/phone-or-email-validator.directive';
import { cellphoneOtp, correlationIdVariable, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-request-otp',
  templateUrl: './request-otp.component.html',
  styleUrls: ['./request-otp.component.scss']
})
export class RequestOtpComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private otpService: OtpService,
    private router: Router) { }

  form: FormGroup = this.fb.group({
    otpDestination: [null, [Validators.required, phoneOrEmailValidator]]
  });

  time: Observable<number> = new Observable();
  loading = false;

  ngOnInit(): void {
  }

  requestOtp() {
    this.loading = true;
    // Set otpScenario based on user's entered input
    let regex = new RegExp(REGEX.cellphone);
    let scenario = regex.test(this.form.controls.otpDestination.value) ? OTP_SCENARIO.changePasswordByCellPhone : OTP_SCENARIO.changePasswordByEmail;

    // Fill otpModelVariable
    otpModelVariable.fill('S', this.form.controls.otpDestination.value, scenario);

    // Request otp
    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        // Hold otp code recieved from backend, in otpCode global variable
        correlationIdVariable.data.id = result.id;

        /**
        * fill otp based on scenario
        */
        if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByCellPhone) {
          cellphoneOtp.data.code = result.otp;
        } else if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByEmail) {
          emailOtp.data.code = result.otp;
        }

        this.router.navigate(['/change-password-otp']);
      } else {
        // user's otp code is not true
      }
    }, erro => {
      this.loading = false;
    })
  }
}
