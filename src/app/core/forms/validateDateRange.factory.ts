import { AbstractControl } from '@angular/forms';
import { stringsToDate } from './stringsToDate.factory';

export function dateRangeValidator(c: AbstractControl) {
  const startDate = c.get('startDate').value;
  const startTime = c.get('startTime').value;
  const endDate = c.get('endDate').value;
  const endTime = c.get('endTime').value;
  // Object to return if date is invalid
  const invalidObj = { 'dateRange': true };
  const startDatetime = stringsToDate(startDate, startTime);
  const endDatetime = stringsToDate(endDate, endTime);

  if (endDatetime >= startDatetime) {
    return null;
  }
  return invalidObj;
}
