import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../../core/models/event.model';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  pageTitle = 'Update Event';
  id: string;
  routeSub: Subscription;
  eventSub: Subscription;
  deleteSub: Subscription;
  event: EventModel;
  loading: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];

        // GET event by ID
        this.eventSub = this.api
          .getEventById$(this.id)
          .subscribe(
            res => {
              this.event = res;
              this.loading = false;
              console.log(this.event);
            },
            err => {
              console.error(err);
              this.loading = false;
              this.error = true;
            }
          );
      });
  }

  deleteEvent() {
    this.deleteSub = this.api
      .deleteEvent$(this.id)
      .subscribe(
        res => {

        },
        err => {

        }
      );
  }

  get isLoaded() {
    return this.loading === false;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.eventSub.unsubscribe();
  }

}
