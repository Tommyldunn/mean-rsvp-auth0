import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });

  userProfile: any;
  isAdmin: boolean;
  // Check localStorage for redirect from auth guard
  private _authRedirect = localStorage.getItem('authRedirect');

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property, admin status, and update login status subject
    // If token is expired but user data still in localStorage, log out
    const lsProfile = localStorage.getItem('profile');

    if (this.authenticated) {
      this.userProfile = JSON.parse(lsProfile);
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
      this.setLoggedIn(true);
    } else if (!this.authenticated && lsProfile) {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // If redirect exists in localStorage, set local prop.
    // If no redirect already set in localStorage,
    // set redirect to current route logging in from.
    if (localStorage.getItem('authRedirect')) {
      this._authRedirect = localStorage.getItem('authRedirect');
    } else {
      localStorage.setItem('authRedirect', this.router.url);
    }
    // Auth0 authorize request
    // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE
    });
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
      this.router.navigate([this._authRedirect]);
      this._clearRedirect();
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    this.isAdmin = this._checkAdmin(profile);
    localStorage.setItem('isAdmin', this.isAdmin.toString());
    this.setLoggedIn(true);
  }

  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf('admin') > -1;
  }

  private _clearRedirect() {
    // Remove auth redirect information
    this._authRedirect = undefined;
    localStorage.removeItem('authRedirect');
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('isAdmin');
    this._clearRedirect();
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('access_token');
  }

}
