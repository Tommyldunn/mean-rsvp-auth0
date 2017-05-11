import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';
import { RsvpModel } from './../../core/models/rsvp.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  pageTitle = 'Profile';
  authSub: Subscription;
  eventListSub: Subscription;
  eventList: RsvpModel[];

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public fs: FilterSortService,
    public utils: UtilsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // DUMMY
    this.authSub = this.auth.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        console.log('user is logged in!');
      } else {
        console.log('user logged out!');
      }
    });

    this.eventListSub = this.api
      .getUserEvents$(this.auth.userProfile.sub)
      .subscribe(
        res => {
          this.eventList = res;
        },
        err => {

        }
      );

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.eventListSub.unsubscribe();
  }

}
