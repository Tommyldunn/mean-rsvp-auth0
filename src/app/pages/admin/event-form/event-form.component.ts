import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { EventModel, FormEventModel } from './../../../core/models/event.model';
import { DatePipe } from '@angular/common';
import { customDateValidator } from './../../../core/forms/validateDate.factory';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  @Input() isEdit: boolean;
  @Output() submitEvent = new EventEmitter();
  timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/i);
  eventForm: FormGroup;
  formEvent: FormEventModel;
  formErrors = {
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    viewPublic: '',
    description: ''
  };
  validationMessages = {
    title: {
      required: 'Title is <strong>required</strong>.',
      minlength: 'Title must be 3 characters or more.',
      maxlength: 'Title must be 24 characters or less.'
    },
    location: {
      required: 'Location is <strong>required</strong>.',
      minlength: 'Location must be 3 characters or more.',
      maxlength: 'Location must be 200 characters or less.'
    },
    startDate: {
      required: 'Start date is <strong>required</strong>.',
      maxlength: 'Start date cannot be longer than 10 characters.',
      date: 'Start date must be a <strong>valid</strong> date at least one day <strong>in the future</strong> using the format <strong>m/d/yyyy</strong>.'
    },
    startTime: {
      required: 'Start time is <strong>required</strong>.',
      pattern: 'Start time must be in the format <strong>H:MM AM/PM</strong>.',
      maxlength: 'Start time must be 8 characters or less.'
    },
    endDate: {
      required: 'End date is <strong>required</strong>.',
      maxlength: 'End date cannot be longer than 10 characters.',
      date: 'End date must be a <strong>valid</strong> date at least one day <strong>in the future</strong> using the format <strong>m/d/yyyy</strong>.'
    },
    endTime: {
      required: 'End time is <strong>required</strong>.',
      pattern: 'End time must be in the format <strong>H:MM AM/PM</strong>.',
      maxlength: 'End time must be 8 characters or less.'
    },
    viewPublic: {
      required: 'You must specify whether this event should be publicly listed.'
    },
    description: {
      maxlength: 'Description must be 1000 characters or less.'
    }
  };
  startTimeDisabled: boolean;
  endDateDisabled: boolean;
  endTimeDisabled: boolean;
  submitDisabled = true;
  formChangeSub: Subscription;
  submitEventSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update Event' : 'Create Event';
    this._setFormEvent();
    this._buildForm();
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

  private _buildForm() {
    this.eventForm = this.fb.group({
      title: new FormControl(this.formEvent.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24)
      ]),
      location: new FormControl(this.formEvent.location, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]),
      startDate: new FormControl(this.formEvent.startDate, [
        Validators.required,
        Validators.maxLength(10),
        customDateValidator()
      ]),
      startTime: new FormControl(this.formEvent.startTime, [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(this.timeRegex)
      ]),
      endDate: new FormControl(this.formEvent.endDate, [
        Validators.required,
        Validators.maxLength(10),
        customDateValidator()
      ]),
      endTime: new FormControl(this.formEvent.endTime, [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(this.timeRegex)
      ]),
      viewPublic: new FormControl(this.formEvent.viewPublic,
        Validators.required
      ),
      description: new FormControl(this.formEvent.description,
        Validators.maxLength(1000)
      )
    });

    // Subscribe to form value changes
    this.formChangeSub = this.eventForm
      .valueChanges
      .subscribe(data => this.onValueChanged(data));

    // If editing, mark fields as touched to trigger validation
    if (this.isEdit) {
      for (const field in this.eventForm.controls) {
        this.eventForm.controls[field].markAsTouched();
      }
    }

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.eventForm;
    console.log('value changed in form', data, this.eventForm);

    if (!form) { return; }

    // Manage disabled states
    // https://github.com/angular/angular/issues/11271#issuecomment-289806196
    // Calling .enable() triggers a maximum call stack error
    const startDate = form.controls['startDate'];
    const startTime = form.controls['startTime'];
    const endDate = form.controls['endDate'];

    this.startTimeDisabled = startDate.invalid;
    this.endDateDisabled = startDate.invalid || startTime.invalid;
    this.endTimeDisabled = startDate.invalid || startTime.invalid || endDate.invalid;
    this.submitDisabled = form.invalid;

    for (const field in this.formErrors) {
      // Clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '<br>';
        }
      }
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

    // if (!this.isEdit) {
    //   this.submitEventSub = this.api
    //     .postEvent$(this.formEvent)
    //     .subscribe(
    //       this._handleSubmitSuccess.bind(this),
    //       this._handleSubmitError.bind(this)
    //     );
    // } else {
    //   this.submitEventSub = this.api
    //     .editEvent$(this.event._id, this.formEvent)
    //     .subscribe(
    //       this._handleSubmitSuccess.bind(this),
    //       this._handleSubmitError.bind(this)
    //     );
    // }
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

  ngOnDestroy() {
    //this.submitEventSub.unsubscribe();
    this.formChangeSub.unsubscribe();
  }

}
