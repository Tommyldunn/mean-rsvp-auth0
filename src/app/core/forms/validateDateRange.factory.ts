import { AbstractControl } from '@angular/forms';
import { dateRegex, timeRegex, stringsToDate } from './formUtils.factory';

export function dateRangeValidator(c: AbstractControl) {
  const startDate = c.get('startDate').value;
  const startTime = c.get('startTime').value;
  const endDate = c.get('endDate').value;
  const endTime = c.get('endTime').value;
  // Object to return if date is invalid
  const invalidObj = { 'dateRange': true };
  let startDatetime;
  let endDatetime;

  if (dateRegex.test(startDate) && dateRegex.test(endDate) && (timeRegex.test(startTime)) && timeRegex.test(endTime)) {
    startDatetime = stringsToDate(startDate, startTime);
    endDatetime = stringsToDate(endDate, endTime);

    if (endDatetime >= startDatetime) {
      return null;
    }
  }
  return invalidObj;
}
