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
  eventListSub: Subscription;
  eventList: RsvpModel[];
  loading: boolean;
  error: boolean;

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public fs: FilterSortService,
    public utils: UtilsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    this.eventListSub = this.api
      .getUserEvents$(this.auth.userProfile.sub)
      .subscribe(
        res => {
          this.eventList = res;
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  get isLoaded() {
    return this.loading === false;
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
  }

}
