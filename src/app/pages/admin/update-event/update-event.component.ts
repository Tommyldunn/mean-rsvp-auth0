import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  confirmDelete: string;
  deleteSub: Subscription;
  event: EventModel;
  loading: boolean;
  submitting: boolean;
  error: boolean;
  deleteErr: boolean;

  constructor(
    private router: Router,
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
        this._getEvent();
      });
  }

  private _getEvent() {
    this.loading = true;
    // GET event by ID
    this.eventSub = this.api
      .getEventById$(this.id)
      .subscribe(
        res => {
          this.event = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  removeEvent() {
    this.submitting = true;

    this.deleteSub = this.api
      .deleteEvent$(this.id)
      .subscribe(
        res => {
          this.submitting = false;
          this.deleteErr = false;
          console.log(res.message);
          this.router.navigate(['/admin']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.deleteErr = true;
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
