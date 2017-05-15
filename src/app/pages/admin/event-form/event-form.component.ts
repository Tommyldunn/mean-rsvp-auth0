import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { EventModel, FormEventModel } from './../../../core/models/event.model';
import { DatePipe } from '@angular/common';
import { dateValidator } from './../../../core/forms/validateDate.factory';
import { dateRangeValidator } from './../../../core/forms/validateDateRange.factory';
import { timeRegex, stringsToDate } from './../../../core/forms/formUtils.factory';
import { EventFormService } from './event-form.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [ EventFormService ]
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  @Input() isEdit: boolean;
  @Output() submitEvent = new EventEmitter();
  eventForm: FormGroup;
  formEvent: FormEventModel;
  // Form validation and disabled logic
  formErrors = {
    title: '',
    location: '',
    viewPublic: '',
    description: '',
    datesGroup: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    }
  };
  startTimeDisabled: boolean;
  endDateDisabled: boolean;
  endTimeDisabled: boolean;
  submitDisabled = true;
  formChangeSub: Subscription;
  // Form submission
  submitEventObj: EventModel;
  submitEventSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private datePipe: DatePipe,
    private ef: EventFormService,
    private router: Router) { }

  ngOnInit() {
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update Event' : 'Create Event';
    // Set up a local property to set initial form data
    this._setFormEvent();
    // Use FormBuilder to construct the form
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
      title: [this.formEvent.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24)
      ]],
      location: [this.formEvent.location, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]],
      viewPublic: [this.formEvent.viewPublic,
        Validators.required
      ],
      description: [this.formEvent.description,
        Validators.maxLength(1000)
      ],
      datesGroup: this.fb.group({
        startDate: [this.formEvent.startDate, [
          Validators.required,
          Validators.maxLength(10),
          dateValidator()
        ]],
        startTime: [this.formEvent.startTime, [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(timeRegex)
        ]],
        endDate: [this.formEvent.endDate, [
          Validators.required,
          Validators.maxLength(10),
          dateValidator()
        ]],
        endTime: [this.formEvent.endTime, [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(timeRegex)
        ]]
      }, { validator: dateRangeValidator })
    });

    // Subscribe to form value changes
    this.formChangeSub = this.eventForm
      .valueChanges
      .subscribe(data => this._onValueChanged(data));

    // Touch fields to trigger immediate validation
    // in case editing an event that is no longer valid
    // (for example, an event in the past)
    if (this.isEdit) {
      const datesGroup = this.eventForm.controls['datesGroup'];

      for (const i in this.eventForm.controls) {
        if (this.eventForm.controls.hasOwnProperty(i)) {
          this.eventForm.controls[i].markAsTouched();
        }
      }
      datesGroup.get('startDate').markAsTouched();
      datesGroup.get('startTime').markAsTouched();
      datesGroup.get('endDate').markAsTouched();
      datesGroup.get('endTime').markAsTouched();
    }

    this._onValueChanged();
  }

  private _onValueChanged(data?: any) {
    if (!this.eventForm) { return; }
    const form = this.eventForm;
    const datesGroup = form.controls['datesGroup'];

    // Manage disabled states
    // https://github.com/angular/angular/issues/11271#issuecomment-289806196
    // Calling .enable() triggers a maximum call stack error
    const startDate = datesGroup.get('startDate');
    const startTime = datesGroup.get('startTime');
    const endDate = datesGroup.get('endDate');
    const endTime = datesGroup.get('endTime');
    this.submitDisabled = form.invalid;

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== 'datesGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          this._setErrMsgs(form.get(field), this.formErrors, field);
        } else {
          // Set errors for fields inside datesGroup
          const datesGroupErrors = this.formErrors['datesGroup'];

          for (const dateField in datesGroupErrors) {
            if (datesGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              datesGroupErrors[dateField] = '';
              this._setErrMsgs(datesGroup.get(dateField), datesGroupErrors, dateField);
            }
          }
        }
      }
    }
  }

  private _setErrMsgs(control: AbstractControl, errorsObj: any, field: string) {
    if (control && (control.dirty || control.touched) && !control.valid) {
      const messages = this.ef.validationMessages[field];

      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + '<br>';
        }
      }
    }
  }

  private _getSubmitObj() {
    const form = this.eventForm;
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new EventModel(
      form.controls['title'].value,
      form.controls['location'].value,
      stringsToDate(form.controls['startDate'].value, form.controls['startTime'].value),
      stringsToDate(form.controls['endDate'].value, form.controls['endDate'].value),
      form.controls['viewPublic'].value,
      form.controls['description'].value || '',
      this.event._id || ''
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitEventSub = this.api
        .postEvent$(this.submitEventObj)
        .subscribe(
          this._handleSubmitSuccess.bind(this),
          this._handleSubmitError.bind(this)
        );
    } else {
      this.submitEventSub = this.api
        .editEvent$(this.event._id, this.submitEventObj)
        .subscribe(
          this._handleSubmitSuccess.bind(this),
          this._handleSubmitError.bind(this)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.router.navigate(['/event', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitEventSub) { this.submitEventSub.unsubscribe(); }
    this.formChangeSub.unsubscribe();
  }

}
