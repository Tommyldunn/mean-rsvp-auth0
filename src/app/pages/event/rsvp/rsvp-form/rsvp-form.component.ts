import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../../auth/auth.service';
import { EventModel } from './../../../../core/models/event.model';
import { RsvpModel } from './../../../../core/models/rsvp.model';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.scss']
})
export class RsvpFormComponent implements OnInit {
  @Input() eventId: string;
  @Input() rsvp: RsvpModel;
  @Output() submitRsvp = new EventEmitter();
  isEdit: boolean;
  formRsvp: RsvpModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isEdit = !!this.rsvp;

    if (!this.isEdit) {
      // if creating a new RSVP, create new RsvpModel with prefill data
      this.formRsvp = new RsvpModel(
        this.auth.userProfile.sub,
        '',
        this.eventId,
        null);
    } else {
      // if editing existing RSVP, create new RsvpModel from existing data
      this.formRsvp = new RsvpModel(
        this.rsvp.userId,
        this.rsvp.name,
        this.rsvp.eventId,
        this.rsvp.attending,
        this.rsvp._id,
        this.rsvp.guests || undefined,
        this.rsvp.comments || undefined
      );
    }
  }

  changeAttendanceSetGuests() {
    if (this.formRsvp.attending && !this.formRsvp.guests) {
      this.formRsvp.guests = 1;
    } else if (!this.formRsvp.attending && this.formRsvp.guests) {
      this.formRsvp.guests = 0;
    }
  }

  checkGuestsSetAttending() {
    if (this.formRsvp.attending && !this.formRsvp.guests) {
      this.formRsvp.attending = false;
    }
  }

}
