import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OTP_CODE_LENGTH, OTP_EXPIRATION_TIME } from 'src/app/core/settings/app.settings';
import { OTP_SCENARIO } from 'src/app/modules/authentication/components/data/otp.senarios.data';
import { NotificationService } from 'src/app/shared/client-services';
import { cellphoneOtp, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { NumberUtility } from 'src/app/shared/utilities';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-otp',
  templateUrl: './change-password-otp.component.html',
  styleUrls: ['./change-password-otp.component.scss'],
})
export class ChangePasswordOtpComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private otpService: OtpService,
    private router: Router,
    private notifService: NotificationService) { }

  otpCodeLenght: number = OTP_CODE_LENGTH;
  form: FormGroup = this.fb.group({
    key: [null, [Validators.required]]
  });

  time: Observable<number> = new Observable();
  loading = false;
  ngOnInit(): void {
    this.startCountDownTimer();
    this.time.subscribe((number: number) => {
      if (number === 0) {
        cellphoneOtp.reset();
        emailOtp.reset();
      }
    });
  }

  // Temporary for demo
  ngAfterViewInit() {
    setTimeout(() => {
      let otpCode = otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByCellPhone ? cellphoneOtp.data.code : emailOtp.data.code
      this.form.controls.key.setValue(otpCode);
    });
  }

  startCountDownTimer() {
    this.time = NumberUtility.countDown(OTP_EXPIRATION_TIME);
  }

  callOtp() {
    this.loading = true;
    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        this.loading = false;

        /**
         * fill otp based on scenario
         */
        if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByCellPhone) {
          cellphoneOtp.data.code = result.otp;
        } else if (otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByEmail) {
          emailOtp.data.code = result.otp;
        }

        this.startCountDownTimer();
      }
    }, error => {
      this.loading = false;
    });
  }

  goToChangePassword() {
    let otpCode = otpModelVariable.data.scenario === OTP_SCENARIO.changePasswordByCellPhone ? cellphoneOtp.data.code : emailOtp.data.code
    if (+this.form.controls.key.value === otpCode) {
      this.router.navigate(['/change-password']);
    } else {
      this.notifService.showError('Entered code in not valid');
    }
  }
}
