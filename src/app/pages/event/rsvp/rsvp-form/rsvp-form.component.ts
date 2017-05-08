import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../../auth/auth.service';
import { EventModel } from './../../../../core/models/event.model';
import { NewRsvpModel } from './../../../../core/models/rsvp.model';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.scss']
})
export class RsvpFormComponent implements OnInit {
  @Input() eventId: string;
  @Output() submitRsvp = new EventEmitter();
  rsvp: NewRsvpModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.rsvp = {
      userId: this.auth.userProfile.sub,
      eventId: this.eventId,
      name: '',
      attending: null,
      guests: 0,
    };
  }

  changeAttendance() {
    if (this.rsvp.attending && !this.rsvp.guests) {
      this.rsvp.guests = 1;
    } else if (!this.rsvp.attending && this.rsvp.guests) {
      this.rsvp.guests = 0;
    }
  }

  checkAttending() {
    if (this.rsvp.attending && !this.rsvp.guests) {
      this.rsvp.attending = false;
    }
  }

}
