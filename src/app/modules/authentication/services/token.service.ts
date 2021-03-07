import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCALSTORAGE_ITEMS } from 'src/app/shared/data';
import { LoginResponseDTO, RefreshTokenResponseDTO } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {
  }

  storeTokens(result: LoginResponseDTO | RefreshTokenResponseDTO): void {
    localStorage.setItem(LOCALSTORAGE_ITEMS.accessToken, result.accessToken);
    localStorage.setItem(LOCALSTORAGE_ITEMS.accessTokenPeriod, (result.accessTokenExpiration * 1000).toString());
    localStorage.setItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime, new Date().getTime().toString());
    localStorage.setItem(LOCALSTORAGE_ITEMS.refreshToken, result.refreshToken);
    localStorage.setItem(LOCALSTORAGE_ITEMS.refreshTokenPeriod, (result.refreshTokenExpiration * 1000).toString());
    localStorage.setItem(LOCALSTORAGE_ITEMS.refreshTokenStoreTime, new Date().getTime().toString());
    localStorage.setItem(LOCALSTORAGE_ITEMS.actionTypes, JSON.stringify(result.actionTypes));
  }

  clearTokens(): void {
    localStorage.removeItem(LOCALSTORAGE_ITEMS.accessToken);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.accessTokenPeriod);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshToken);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshTokenPeriod);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshTokenStoreTime);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.actionTypes);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.accessToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.refreshToken);
  }

  getAccessTokenPeriod(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenPeriod));
  }

  getRefreshTokenPeriod(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.refreshTokenPeriod));
  }

  getAccessTokenStoreTime(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime));
  }

  getRefreshTokenStoreTime(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime));
  }

  getActionTypes(): string[] | null {
    let actionTypes = localStorage.getItem(LOCALSTORAGE_ITEMS.actionTypes);
    return actionTypes ? JSON.parse(actionTypes) : null;
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }
}
