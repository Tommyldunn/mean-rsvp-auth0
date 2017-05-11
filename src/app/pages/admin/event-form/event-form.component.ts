import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { EventModel, FormEventModel } from './../../../core/models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() event: EventModel;
  @Input() isEdit: boolean;
  @Output() submitEvent = new EventEmitter();
  timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/g);
  formEvent: FormEventModel;
  submitEventSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private api: ApiService,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update Event' : 'Create Event';
    this._setFormEvent();
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      this.formEvent = new FormEventModel(null, null, null, null, null, null, null);
    } else {
      // If editing an existing event,
      // create new EventModel from existing data
      this.formEvent = new FormEventModel(
        this.event.title,
        this.event.location,
        this.datePipe.transform(this.event.startDatetime, 'shortDate'),
        this.datePipe.transform(this.event.startDatetime, 'shortTime'),
        this.datePipe.transform(this.event.endDatetime, 'shortDate'),
        this.datePipe.transform(this.event.endDatetime, 'shortTime'),
        this.event.viewPublic,
        this.event.description || ''
      );
    }
  }

  _convertFormEvent() {
    // Convert form event startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel to for submission
    // return new EventModel(
    //   this.formEvent.title,
    //   this.formEvent.location,
    //   // convert startDatetime,
    //   // convert endDatetime,
    //   this.formEvent.viewPublic,
    //   this.formEvent.description || '',
    //   this.event._id || ''
    // );
  }

  onSubmit() {
    this.submitting = true;
    //this.submitEventObj = this._convertFormEvent(this.formEvent);

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
