import { Component, OnInit } from '@angular/core';
import { ENV } from './../../core/env.config';
import { AUTH_CONFIG } from './../../auth/auth.config';
import auth0 from 'auth0-js';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  webAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });
  result: any;

  constructor() {
    this.result = this.webAuth.parseHash(window.location.hash, (err, data) =>
      parent.postMessage(err || data, ENV.BASE_URI)
    );
  }

  ngOnInit() {
  }

}
