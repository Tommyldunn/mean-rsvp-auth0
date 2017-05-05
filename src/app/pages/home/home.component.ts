import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Events';
  authSub: Subscription;
  eventListSub: Subscription;
  eventList: EventModel[];

  constructor(
    private title: Title,
    private auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    this.authSub = this.auth.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        console.log('user is logged in!');
      }
    });

    this.eventListSub = this.api
      .getEvents$()
      .subscribe((res) => {
        this.eventList = res;
      });

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.eventListSub.unsubscribe();
  }

}
