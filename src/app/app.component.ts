import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navOpen: boolean;

  navToggleHandler(e: boolean) {
    this.navOpen = e;
  }
}
