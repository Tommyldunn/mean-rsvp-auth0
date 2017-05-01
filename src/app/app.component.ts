import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navOpen: boolean;

  navToggledHandler(e: boolean) {
    this.navOpen = e;
  }
}
