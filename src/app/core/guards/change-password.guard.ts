import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuard implements CanActivate {
  constructor(private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (otpModelVariable.isFilled()) {
      return true;
    } else { 
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
