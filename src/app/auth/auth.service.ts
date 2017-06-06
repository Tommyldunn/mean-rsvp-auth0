import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;
  isAdmin: boolean;
  // Check localStorage for redirect from auth guard
  private _authRedirect = localStorage.getItem('authRedirect');
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  // Subscribe to token stream
  refreshSubscription: Subscription;

  constructor(private router: Router) {
    // If authenticated, set local profile property,
    // admin status, update login status, schedule renewal.
    // If not authenticated but there are still items
    // in localStorage, log out
    const lsProfile = localStorage.getItem('profile');

    if (this.authenticated) {
      this.userProfile = JSON.parse(lsProfile);
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
      this.setLoggedIn(true);
      this.scheduleRenewal();
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
    this.auth0.authorize();
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
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
      this.router.navigate([this._authRedirect || '/']);
      this._clearRedirect();
    });
  }

  private _setSession(authResult, profile?) {
    // Set tokens and expiration in localStorage
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // If initial login, set profile and admin information
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.userProfile = profile;
      this.isAdmin = this._checkAdmin(profile);
      localStorage.setItem('isAdmin', this.isAdmin.toString());
    }
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    // Schedule token renewal
    this.scheduleRenewal();
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
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('expires_at');
    // Clear redirect, reset local properties, update loggedIn$ stream
    this._clearRedirect();
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);
    // Unschedule auth token renewal
    this.unscheduleRenewal();
    // Return to homepage
    this.router.navigate(['/']);
  }

  get authenticated(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  renewToken() {
    this.auth0.renewAuth({
      audience: AUTH_CONFIG.AUDIENCE,
      redirectUri: AUTH_CONFIG.REDIRECT,
      usePostMessage: true
    }, (err, authResult) => {
      if (err) {
        console.error(`Could not renew token with silent authentication: ${err.error}`);
      } else {
        alert('renewed auth successfully');
        this._setSession(authResult);
      }
    });
  }

  scheduleRenewal() {
    if (!this.authenticated) { return; }
    this.unscheduleRenewal();
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const expiresAt$ = Observable.of(expiresAt)
      .flatMap(expires => {
        const now = Date.now();
        // Use timer delay to run renew token at proper time
        return Observable.timer(Math.max(1, expires - now));
      });

    this.refreshSubscription = expiresAt$.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  unscheduleRenewal() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

}
