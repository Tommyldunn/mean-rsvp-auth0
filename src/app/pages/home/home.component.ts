import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Events';
  eventListSub: Subscription;
  eventList: EventModel[];

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    this.eventListSub = this.api
      .getEvents$()
      .subscribe((res) => {
        this.eventList = res;
      });
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
  }

}
