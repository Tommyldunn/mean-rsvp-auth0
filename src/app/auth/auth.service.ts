import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.variables';
import { tokenNotExpired } from 'angular2-jwt';
import { UserProfile } from './profile.model';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .SAMPLE from src/app/auth/auth.variables.SAMPLE.ts
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });

  userProfile: UserProfile;
  isAdmin: boolean;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
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
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    this.isAdmin = this._checkIfAdmin(profile);
    this.setLoggedIn(true);
  }

  private _checkIfAdmin(profile) {
    // Check if the user has admin role
    const appMetadata = profile._json.app_metadata || {};
    const roles = appMetadata.roles || [];
    return roles.indexOf('admin') != -1;
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('access_token');
  }

}
