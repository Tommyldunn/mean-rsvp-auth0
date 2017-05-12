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
  timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/);

  constructor() { }

  stringsToDate(dateStr: string, timeStr: string) {
    const timeArr = timeStr.split(/[\s:]+/);
    let date = new Date(dateStr);
    let hour = +timeArr[0];
    let min = +timeArr[1];
    let pm = timeArr[2].toLowerCase() === 'pm';

    if (pm) { hour += 12; }
    date.setHours(hour);
    date.setMinutes(min);

    return date;
  }

}
