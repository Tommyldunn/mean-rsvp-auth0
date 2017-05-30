import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { EventModel, FormEventModel } from './../../../core/models/event.model';
import { DatePipe } from '@angular/common';
import { dateValidator } from './../../../core/forms/date.validator';
import { dateRangeValidator } from './../../../core/forms/date-range.validator';
import { dateRegex, timeRegex, stringsToDate } from './../../../core/forms/formUtils.factory';
import { EventFormService } from './event-form.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [ EventFormService ]
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  isEdit: boolean;
  // FormBuilder form
  eventForm: FormGroup;
  // Property storing form inputs
  formEvent: FormEventModel;
  // Form validation and disabled logic
  formErrors: any;
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
    public ef: EventFormService,
    private router: Router) { }

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update Event' : 'Create Event';
    // Set up a local property to set initial form data
    this.formEvent = this._setFormEvent();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new FormEventModel(null, null, null, null, null, null, null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      // Transform datetimes:
      // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
      // 'shortDate': 9/3/2010
      // 'shortTime': 12:05 PM
      return new FormEventModel(
        this.event.title,
        this.event.location,
        this.datePipe.transform(this.event.startDatetime, 'shortDate'),
        this.datePipe.transform(this.event.startDatetime, 'shortTime'),
        this.datePipe.transform(this.event.endDatetime, 'shortDate'),
        this.datePipe.transform(this.event.endDatetime, 'shortTime'),
        this.event.viewPublic,
        this.event.description
      );
    }
  }

  private _buildForm() {
    this.eventForm = this.fb.group({
      title: [this.formEvent.title, [
        Validators.required,
        Validators.minLength(this.ef.textMin),
        Validators.maxLength(this.ef.titleMax)
      ]],
      location: [this.formEvent.location, [
        Validators.required,
        Validators.minLength(this.ef.textMin),
        Validators.maxLength(this.ef.locMax)
      ]],
      viewPublic: [this.formEvent.viewPublic,
        Validators.required
      ],
      description: [this.formEvent.description,
        Validators.maxLength(this.ef.descMax)
      ],
      datesGroup: this.fb.group({
        startDate: [this.formEvent.startDate, [
          Validators.required,
          Validators.maxLength(this.ef.dateMax),
          Validators.pattern(dateRegex),
          dateValidator()
        ]],
        startTime: [this.formEvent.startTime, [
          Validators.required,
          Validators.maxLength(this.ef.timeMax),
          Validators.pattern(timeRegex)
        ]],
        endDate: [this.formEvent.endDate, [
          Validators.required,
          Validators.maxLength(this.ef.dateMax),
          Validators.pattern(dateRegex),
          dateValidator()
        ]],
        endTime: [this.formEvent.endTime, [
          Validators.required,
          Validators.maxLength(this.ef.timeMax),
          Validators.pattern(timeRegex)
        ]]
      }, { validator: dateRangeValidator })
    });

    // Subscribe to form value changes
    this.formChangeSub = this.eventForm
      .valueChanges
      .subscribe(data => this._onValueChanged(data));

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const datesGroup = this.eventForm.controls['datesGroup'];
      for (const i in this.eventForm.controls) {
        if (this.eventForm.controls.hasOwnProperty(i)) {
          this.eventForm.controls[i].markAsDirty();
        }
      }
      datesGroup.get('startDate').markAsDirty();
      datesGroup.get('startTime').markAsDirty();
      datesGroup.get('endDate').markAsDirty();
      datesGroup.get('endTime').markAsDirty();
    }

    this._onValueChanged();
  }

  private _onValueChanged(data?: any) {
    if (!this.eventForm) { return; }
    const form = this.eventForm;
    const datesGroup = form.controls['datesGroup'];
    // Manage submit button disabled state [attr.disabled]
    // See https://github.com/angular/angular/issues/11271#issuecomment-289806196
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
    if (control && control.dirty && control.invalid) {
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
    const datesGroup = form.controls['datesGroup'];
    const startDate = datesGroup.get('startDate').value;
    const startTime = datesGroup.get('startTime').value;
    const endDate = datesGroup.get('endDate').value;
    const endTime = datesGroup.get('endTime').value;
    const id = this.event ? this.event._id : '';
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new EventModel(
      form.get('title').value,
      form.get('location').value,
      stringsToDate(startDate, startTime),
      stringsToDate(endDate, endTime),
      form.get('viewPublic').value,
      form.get('description').value || '',
      id
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
    // Redirect to event detail
    this.router.navigate(['/event', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.eventForm.reset();
  }

  ngOnDestroy() {
    if (this.submitEventSub) {
      this.submitEventSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}
