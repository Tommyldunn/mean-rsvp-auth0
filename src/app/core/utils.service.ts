import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(
    private datePipe: DatePipe
  ) { }

  eventDates(start, end) {
    // Display single-day events as "1/7/2018"
    // Display multi-day events as "8/12/2017 - 8/13/2017"
    const startDate = this.datePipe.transform(start, 'mediumDate');
    const endDate = this.datePipe.transform(end, 'mediumDate');

    if (startDate === endDate) {
      return startDate;
    } else {
      return startDate + ' - ' + endDate;
    }
  }

  eventDatesTimes(start, end) {
    // Display single-day events as "1/7/2018, 5:30 PM - 7:30 PM"
    // Display multi-day events as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
    const startDate = this.datePipe.transform(start, 'shortDate');
    const startTime = this.datePipe.transform(start, 'shortTime');
    const endDate = this.datePipe.transform(end, 'shortDate');
    const endTime = this.datePipe.transform(end, 'shortTime');

    if (startDate === endDate) {
      return `${startDate}, ${startTime} - ${endTime}`;
    } else {
      return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
    }
  }

  displayCount(guests: number) {
    // Example usage:
    // {{displayCount(guests)}} attending this event
    const persons = guests === 1 ? ' person is' : ' people are';
    return guests + persons;
  }

  booleanToText(bool: boolean) {
    return bool ? 'Yes' : 'No';
  }

}
