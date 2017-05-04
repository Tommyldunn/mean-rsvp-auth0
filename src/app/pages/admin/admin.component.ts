import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  eventsSub: Subscription;
  eventList: EventModel[];

  constructor(
    public auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.eventsSub = this.api
      .getAdminEvents$()
      .subscribe((res) => {
        this.eventList = res;
        console.log(this.eventList);
      });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

}
