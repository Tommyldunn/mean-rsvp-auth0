import { Component, OnInit } from '@angular/core';
import { ENV } from './../../core/env.config';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor() {
    parent.postMessage(window.location.hash, ENV.BASE_URI);
  }

  ngOnInit() {
  }

}
