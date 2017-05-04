import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { EventModel } from './../../core/models/event.model';
import { RsvpModel } from './../../core/models/rsvp.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  id: String;
  routeSub: Subscription;
  eventSub: Subscription;
  event: EventModel;
  userRsvp: RsvpModel;
  allRsvps: RsvpModel[];

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private api: ApiService,
    public title: Title) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe((params) => {
        this.id = params['id'];

        // GET event by ID
        this.eventSub = this.api
          .getEventById$(this.id)
          .subscribe((res) => {
            this.event = res;
            this.allRsvps = this.event.rsvps;
            this.userRsvp = this._getUserRsvp();
            console.log(this.event);
          });
      });
  }

  private _getUserRsvp() {
    if (this.allRsvps.length) {
      for (let i = 0; i < this.allRsvps.length; i++) {
        let thisRsvp = this.allRsvps[i];

        if (thisRsvp.userId === this.auth.userProfile.sub) {
          return thisRsvp;
        }
      }
    }
  }

  rsvpCount(guests: Number) {
    const persons = guests === 1 ? ' person has' : ' people have';
    return guests + persons;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.eventSub.unsubscribe();
  }

}
