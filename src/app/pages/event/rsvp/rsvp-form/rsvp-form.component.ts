import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../../core/api.service';
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
  submitRsvpSub: Subscription

  constructor(
    private auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.isEdit = !!this.rsvp;
    this._setFormRsvp();
  }

  private _setFormRsvp() {
    if (!this.isEdit) {
      // If creating a new RSVP,
      // create new RsvpModel with default data
      this.formRsvp = new RsvpModel(
        this.auth.userProfile.sub,
        '',
        this.eventId,
        null,
        0,
        '');
    } else {
      // If editing an existing RSVP,
      // create new RsvpModel from existing data
      this.formRsvp = new RsvpModel(
        this.rsvp.userId,
        this.rsvp.name,
        this.rsvp.eventId,
        this.rsvp.attending,
        this.rsvp.guests || 0,
        this.rsvp.comments || '',
        this.rsvp._id
      );
    }
  }

  changeAttendanceSetGuests() {
    // If attendance changed to yes, set guests: 1
    // If attendance changed to no, set guests: 0
    if (this.formRsvp.attending && !this.formRsvp.guests) {
      this.formRsvp.guests = 1;
    } else if (!this.formRsvp.attending && this.formRsvp.guests) {
      this.formRsvp.guests = 0;
    }
  }

  changeGuestsSetAttending() {
    // If guests changed to 0, set attending: false
    if (this.formRsvp.attending && !this.formRsvp.guests) {
      this.formRsvp.attending = false;
    }
  }

  onSubmit() {
    let eventObj: any = {
      rsvp: null,
      error: null
    };

    if (!this.isEdit) {
      this.submitRsvpSub = this.api
        .postRsvp$(this.formRsvp)
        .subscribe(
          res => {
            eventObj.rsvp = res;
            this.submitRsvp.emit(eventObj);
          },
          err => {
            eventObj.error = err;
            this.submitRsvp.emit(eventObj);
            console.error(err);
            // @TODO: handle error in some visible way
          }
        );
    } else {
      this.submitRsvpSub = this.api
        .editRsvp$(this.rsvp._id, this.formRsvp)
        .subscribe(
          res => {
            eventObj.rsvp = res;
            this.submitRsvp.emit(eventObj);
          },
          err => {
            eventObj.error = err;
            this.submitRsvp.emit(eventObj);
            console.error(err);
            // @TODO: handle error in some visible way
          }
        );
    }
  }

}
