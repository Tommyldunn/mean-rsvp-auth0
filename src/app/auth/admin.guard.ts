import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate() {
    if (this.auth.isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
