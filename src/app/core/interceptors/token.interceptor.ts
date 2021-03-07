import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { RefreshTokenDTO } from 'src/app/modules/authentication/dto';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { TokenService } from 'src/app/modules/authentication/services/token.service';
import { RefreshTokenDecisionEnum } from 'src/app/shared/enums/refresh-token-decision.enum';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router) { }

  isRefreshing = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.getAccessToken();

    if (token) {
      let cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });

      switch (this.authService.whatDecesionForRefreshToken()) {
        case RefreshTokenDecisionEnum.noNeed:
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.needAsynchronously:
          if (!this.isRefreshing) {
            console.log('refresh-token asynchronously started')
            this.isRefreshing = true;
            this.refreshTokenAsyncronously();
          }
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.needSynchronously:
          if (!this.isRefreshing) {
            console.log('refresh-token synchronously started')
            this.isRefreshing = true;
            this.refreshTokenSyncronously();
            console.log('refresh-token synchronously finished')
            this.isRefreshing = false;
          }
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.logout:
          this.tokenService.clearTokens();
          this.router.navigate(['/login']);
          return EMPTY;
      }
    } else {
      return next.handle(request);
    }
  }

  refreshTokenAsyncronously(): void {
    this.authService.refreshToken(this.createTokenModel()).then(result => {
      console.log('refresh-token asynchronously finished')
      this.isRefreshing = false;
    });
  }

  async refreshTokenSyncronously(): Promise<any> {
    await this.authService.refreshToken(this.createTokenModel());
  }

  createTokenModel(): RefreshTokenDTO {
    return {
      refreshToken: <string>this.tokenService.getRefreshToken()
    };
  }
}
