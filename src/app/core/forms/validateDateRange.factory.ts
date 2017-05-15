import { AbstractControl } from '@angular/forms';
import { stringsToDate } from './formUtils.factory';

export function dateRangeValidator(c: AbstractControl) {
  // Get controls in group
  const startDateC = c.get('startDate');
  const startTimeC = c.get('startTime');
  const endDateC = c.get('endDate');
  const endTimeC = c.get('endTime');
  // Object to return if date is invalid
  const invalidObj = { 'dateRange': true };
  let startDatetime;
  let endDatetime;

  // If start and end dates are valid, can check range (with prefilled times)
  // Final check happens when all dates/times are valid
  if (startDateC.valid && endDateC.valid) {
    const checkStartTime = startTimeC.invalid ? '12:00 AM' : startTimeC.value;
    const checkEndTime = endTimeC.invalid ? '11:59 PM' : endTimeC.value;

    startDatetime = stringsToDate(startDateC.value, checkStartTime);
    endDatetime = stringsToDate(endDateC.value, checkEndTime);

    console.log(startDatetime, endDatetime);

    if (endDatetime >= startDatetime) {
      return null;
    } else {
      return invalidObj;
    }
  }
  return null;
}
