import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.auth.authenticated) {
      return true;
    } else {
      // save guarded route to redirect to after login
      localStorage.setItem('authRedirect', state.url);
      this.auth.login();
      return false;
    }
  }

}
