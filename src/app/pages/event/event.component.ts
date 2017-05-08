import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';
import { RsvpModel } from './../../core/models/rsvp.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  eventSub: Subscription;
  event: EventModel;
  userRsvp: RsvpModel;
  allRsvps: RsvpModel[];
  loading: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe((params) => {
        this.id = params['id'];

        // GET event by ID
        this.eventSub = this.api
          .getEventById$(this.id)
          .subscribe(
            res => {
              this.event = res;
              this._setPageTitle(this.event.title);
              this.allRsvps = this.event.rsvps;
              this.userRsvp = this._getUserRsvp();
              this.loading = false;
              console.log(this.event);
            },
            err => {
              console.error(err);
              this.loading = false;
              this.error = true;
              this._setPageTitle('Event Details');
            }
          );
      });
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  private _getUserRsvp() {
    if (this.allRsvps.length) {
      for (let i = 0; i < this.allRsvps.length; i++) {
        const thisRsvp = this.allRsvps[i];

        if (thisRsvp.userId === this.auth.userProfile.sub) {
          return thisRsvp;
        }
      }
    }
  }

  get isLoaded() {
    return this.loading === false;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.eventSub.unsubscribe();
  }

}
