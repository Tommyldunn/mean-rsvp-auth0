import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';
import { RsvpModel } from './../../core/models/rsvp.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  rsvpListSub: Subscription;
  rsvpList: RsvpModel[];

  constructor(
    public auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.authSub = this.auth.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        console.log('user is logged in!');
      } else {
        console.log('user logged out!');
      }
    });

    this.rsvpListSub = this.api
      .getUserRsvps$(this.auth.userProfile.sub)
      .subscribe((res) => {
        this.rsvpList = res;
        console.log(this.rsvpList);
      });

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.rsvpListSub.unsubscribe();
  }

}
