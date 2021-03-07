import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { registerModelVariable } from 'src/app/shared/global-variables';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (registerModelVariable.isFilled()) {
      return true;
    } else { 
      this.router.navigate(['/register']);
      return false;
    };
  }
  
}
