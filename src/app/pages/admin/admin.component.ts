import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  pageTitle = 'Admin';
  eventsSub: Subscription;
  eventList: EventModel[];

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

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
