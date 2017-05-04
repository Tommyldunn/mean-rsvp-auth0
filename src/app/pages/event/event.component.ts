import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: string;
  routeSub: Subscription;
  eventSub: Subscription;
  event: EventModel;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      
      // GET event by ID
      this.eventSub = this.api
        .getEventById$(this.id)
        .subscribe((res) => {
          this.event = res;
          console.log(this.event);
        });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.eventSub.unsubscribe();
  }

}
