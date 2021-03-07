import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { REFRESH_TOKEN_REQUEST_TIME_LIMIT } from 'src/app/core/settings/app.settings';
import { UserResponseDTO } from 'src/app/shared/dto';
import { RefreshTokenDecisionEnum } from 'src/app/shared/enums/refresh-token-decision.enum';
import { tokenRemainingTime } from 'src/app/shared/global-variables/token-time-variable';
import { NumberUtility } from 'src/app/shared/utilities';
import { environment } from 'src/environments/environment';
import {
  LoginDTO,
  LoginResponseDTO,
  RefreshTokenDTO,
  RefreshTokenResponseDTO
} from '../dto';
import { LogoutResponseDTO } from '../dto/logout.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiAddress: string = '';
  constructor(private http: HttpClient,
    private tokenService: TokenService) {
    this.apiAddress = environment.apiEndPoint + '/account';
  }

  login(model: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.apiAddress + '/login', model).pipe(
      tap((result: LoginResponseDTO) => {
        this.tokenService.storeTokens(result);
        this.initTokenExpireTimeManagement();
      })
    );
  }

  logout(): Observable<LogoutResponseDTO> {
    return this.http.post<LogoutResponseDTO>(this.apiAddress + '/logout', null).pipe(
      tap(result => {
        this.tokenService.clearTokens();
      })
    );
  }

  getUser(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(this.apiAddress + '/user');
  }

  refreshToken(model: RefreshTokenDTO): Promise<RefreshTokenResponseDTO> {
    return this.http.post<RefreshTokenResponseDTO>(this.apiAddress + '/refresh-token', model).pipe(
      tap((result: RefreshTokenResponseDTO) => {
        this.tokenService.storeTokens(result);
        this.initTokenExpireTimeManagement();
      })
    ).toPromise()
  }

  /**
   * Token expiration time management
   */
  // accessTokenStoreTime: number;
  accessTokenValue: string | null;
  accessTokenStoreTime: number;
  accessTokenPeriod: number;
  refreshTokenValue: string | null;
  refreshTokenStoreTime: number;
  refreshTokenPeriod: number;

  accessTokenTimer$: Observable<number>;
  accessTokenTimeUnsubscriber: Subscription;
  refreshTokenTimer$: Observable<number>;
  refreshTokenTimeUnsubscriber: Subscription;

  initTokenExpireTimeManagement(): void {
    this.accessTokenValue = this.tokenService.getAccessToken();
    this.accessTokenPeriod = this.tokenService.getAccessTokenPeriod();
    this.accessTokenStoreTime = this.tokenService.getAccessTokenStoreTime();

    this.refreshTokenValue = this.tokenService.getRefreshToken();
    this.refreshTokenPeriod = this.tokenService.getRefreshTokenPeriod();
    this.refreshTokenStoreTime = this.tokenService.getRefreshTokenStoreTime();

    if (this.hasToken()) {
      this.checkAccessTokenExpireTime();
      this.checkRefreshTokenExpireTime();
    } else {
      tokenRemainingTime.reset();
    }
  }

  private hasToken(): boolean {
    return Boolean(this.accessTokenValue && this.accessTokenPeriod && this.accessTokenStoreTime
      && this.refreshTokenValue && this.refreshTokenPeriod && this.refreshTokenStoreTime);
  }

  private checkAccessTokenExpireTime(): void {
    if (this.accessTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.accessTokenStoreTime;

      if (spentTime < this.accessTokenPeriod) {
        let remainingTime = this.accessTokenPeriod - spentTime;
        this.setTimerForAccessToken(remainingTime);
      } else {
        tokenRemainingTime.resetAccessTokenTime();
      }
    }
  }

  private checkRefreshTokenExpireTime(): void {
    if (this.refreshTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.refreshTokenStoreTime;

      if (spentTime < this.refreshTokenPeriod) {
        let remainingTime = this.refreshTokenPeriod - spentTime;
        this.setTimerForRefreshToken(remainingTime);
      } else {
        tokenRemainingTime.resetRefreshTokenTime();
      }
    }
  }

  private setTimerForAccessToken(time: number): void {
    if (this.accessTokenTimeUnsubscriber) {
      this.accessTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for AccessToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.accessTokenTime = timeInSecond;
    this.accessTokenTimer$ = NumberUtility.countDown(timeInSecond - 1);
    this.accessTokenTimeUnsubscriber = this.accessTokenTimer$.subscribe((num: number) => {
      tokenRemainingTime.data.accessTokenTime = num;
    });
  }

  private setTimerForRefreshToken(time: number): void {
    if (this.refreshTokenTimeUnsubscriber) {
      this.refreshTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for RefreshToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.refreshTokenTime = timeInSecond;
    this.refreshTokenTimer$ = NumberUtility.countDown(timeInSecond);
    this.refreshTokenTimeUnsubscriber = this.refreshTokenTimer$.subscribe((num: number) => {
      tokenRemainingTime.data.refreshTokenTime = num;
    });
  }

  whatDecesionForRefreshToken(): RefreshTokenDecisionEnum {
    let accessTokenTimeInSecond = this.accessTokenPeriod / 1000;
    let decision: RefreshTokenDecisionEnum;
    if (tokenRemainingTime.data.accessTokenTime > (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.max)) {
      decision = RefreshTokenDecisionEnum.noNeed;
    } else if (tokenRemainingTime.data.accessTokenTime > (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.min) &&
      tokenRemainingTime.data.accessTokenTime < (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.max)) {
      decision = RefreshTokenDecisionEnum.needAsynchronously;
    } else {
      if (tokenRemainingTime.data.refreshTokenTime > 0) {
        decision = RefreshTokenDecisionEnum.needSynchronously;
      } else {
        decision = RefreshTokenDecisionEnum.logout;
      }
    }

    return decision;
  }
}
