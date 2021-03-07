import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { ErrorService, NotificationService } from 'src/app/shared/client-services';
import { RefreshTokenDecisionEnum } from 'src/app/shared/enums';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService,
    private errorService: ErrorService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  isRefreshing = false;
  errorMessage: string = '';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('ErrorEvent occurred');
          } else {
            this.errorMessage = this.errorService.getErrorMessage(error);
            switch (error.status) {
              case 400:
                this.handle400Error();
                break;

              case 401:
                  this.handle401Error();
                break;

              case 403:
                this.handle403Error();
                break;

              case 409:
                this.handle409Error();
                break;

              case 500:
                this.handle500Error();
                break;

              default:
                break;
            }
          }
        } else {
          console.error('An unknown error occurred')
        }
        return throwError(error);
      })
    );
  }

  handle400Error() {
    this.notificationService.showError(this.errorMessage);
  }

  handle401Error() {
    console.log(RefreshTokenDecisionEnum[this.authService.whatDecesionForRefreshToken()]);
    this.notificationService.showError(this.errorMessage);
    this.router.navigate(['/login']);
  }

  handle403Error() {
    this.notificationService.showError(this.errorMessage);
    this.router.navigate(['/login']);
  }

  handle409Error() {
    this.notificationService.showError(this.errorMessage);
  }

  handle500Error() {
    let errorMessage = 'Server is not Responsible. Please try again later';
    this.notificationService.showError(errorMessage);
  }
}
