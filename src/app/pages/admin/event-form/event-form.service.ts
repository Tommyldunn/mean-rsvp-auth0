import { Injectable } from '@angular/core';

@Injectable()
export class EventFormService {
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
      pattern: 'Start date must be in the format <strong>M/D/YYYY</strong> or <strong>MM/DD/YYYY</strong>.',
      date: 'Start date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.'
    },
    startTime: {
      required: 'Start time is <strong>required</strong>.',
      pattern: 'Start time must be a <strong>valid time</strong> in the format <strong>HH:MM AM/PM</strong>.',
      maxlength: 'Start time must be 8 characters or less.'
    },
    endDate: {
      required: 'End date is <strong>required</strong>.',
      maxlength: 'End date cannot be longer than 10 characters.',
      pattern: 'End date must be in the format <strong>M/D/YYYY</strong> or <strong>MM/DD/YYYY</strong>.',
      date: 'End date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.'
    },
    endTime: {
      required: 'End time is <strong>required</strong>.',
      pattern: 'End time must be a <strong>valid time</strong> in the format <strong>HH:MM AM/PM</strong>.',
      maxlength: 'End time must be 8 characters or less.'
    },
    viewPublic: {
      required: 'You must specify whether this event should be publicly listed.'
    },
    description: {
      maxlength: 'Description must be 1000 characters or less.'
    }
  };

  constructor() { }

}
