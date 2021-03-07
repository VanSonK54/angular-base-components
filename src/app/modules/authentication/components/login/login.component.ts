import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerModelVariable } from 'src/app/shared/global-variables';
import { cellphoneOtp, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, [Validators.required]]
  });

  loading = false;
  ngOnInit(): void {
    registerModelVariable.reset();
    otpModelVariable.reset();
    cellphoneOtp.reset();
    emailOtp.reset();
  }

  login() {
    this.loading = true;
    this.authService.login(this.form.value).subscribe((result: any) => {
      if (result.accessToken) {
        // Storing user's token
        if (environment.production) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/admin/party/list']);
        }
      }
    }, error => {
      this.loading = false;
    });
  }
}
