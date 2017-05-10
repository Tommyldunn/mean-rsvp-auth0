import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(
    private datePipe: DatePipe) { }

  eventDates(start, end): string {
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

  eventDatesTimes(start, end): string {
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

  eventPast(eventEnd): boolean {
    // Check if event has already ended
    const now = new Date();
    const then = new Date(eventEnd.toString());
    return now >= then;
  }

  displayCount(guests: number): string {
    // Example usage:
    // {{displayCount(guests)}} attending this event
    const persons = guests === 1 ? ' person' : ' people';
    return guests + persons;
  }

  showPlusOnes(guests: number): string {
    // If bringing additional guest(s), show as "+n"
    if (guests > 1) {
      return `+${guests - 1}`;
    }
  }

  booleanToText(bool: boolean): string {
    // Change a boolean to 'Yes' or 'No' string
    return bool ? 'Yes' : 'No';
  }

  filter(array: any[], property: string, value: any) {
    // return values with specific key/value pair
    if (!property || value === undefined) {
      return array;
    } else if (array) {
      const filteredArray = array.filter(item => {
        for (const key in item) {
          if (key === property && item[key] === value) {
            return true;
          }
        }
      });
      return filteredArray;
    }
  }

  search(array: any[], query: string) {
    // match query to string values
    // @TODO: support dates too
    const lQuery = query.toLowerCase();

    if (!query) {
      return array;
    } else if (array) {
      const filteredArray = array.filter(item => {
        for (const key in item) {
          if ((typeof item[key] === 'string') && (item[key].toLowerCase().indexOf(lQuery) !== -1)) {
            return true;
          }
        }
      });
      return filteredArray;
    }
  }

}
