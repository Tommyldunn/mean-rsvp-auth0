import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
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
  loading: boolean;
  error: boolean;

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    this.eventListSub = this.api
      .getEvents$()
      .subscribe(
        res => {
          this.eventList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
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
