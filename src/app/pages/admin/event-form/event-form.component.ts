import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { EventModel } from './../../../core/models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() event: EventModel;
  @Input() isEdit: boolean;
  @Output() submitEvent = new EventEmitter();
  formEvent: EventModel;
  submitEventSub: Subscription;
  error: boolean;
  submitting: boolean;

  constructor(
    private api: ApiService) { }

  ngOnInit() {
    this.isEdit = !!this.event;
    this._setFormEvent();
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event,
      // create new EventModel with default data
      this.formEvent = new EventModel(null, null, null, null, null);
    } else {
      // If editing an existing event,
      // create new EventModel from existing data
      this.formEvent = new EventModel(
        this.event.title,
        this.event.location,
        this.event.startDatetime,
        this.event.endDatetime,
        this.event.viewPublic,
        this.event.description || '',
        this.event._id
      );
    }
  }

  onSubmit() {
    this.submitting = true;

    if (!this.isEdit) {
      this.submitEventSub = this.api
        .postEvent$(this.formEvent)
        .subscribe(
          this._handleSubmitSuccess.bind(this),
          this._handleSubmitError.bind(this)
        );
    } else {
      this.submitEventSub = this.api
        .editEvent$(this.event._id, this.formEvent)
        .subscribe(
          this._handleSubmitSuccess.bind(this),
          this._handleSubmitError.bind(this)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    const eventObj = {
      isEdit: this.isEdit,
      event: res
    };
    this.submitEvent.emit(eventObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const eventObj = {
      isEdit: this.isEdit,
      error: err
    };
    this.submitEvent.emit(eventObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

}
