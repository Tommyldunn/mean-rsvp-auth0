import { AbstractControl } from '@angular/forms';

export function dateRangeValidator(c: AbstractControl) {
  const startDate = c.get('startDate').value;
  const startTime = c.get('startTime').value;
  const endDate = c.get('endDate').value;
  const endTime = c.get('endTime').value;
  // Object to return if date is invalid
  const invalidObj = { 'dateRange': true };
  const startDatetime = _stringsToDate(startDate, startTime);
  const endDatetime = _stringsToDate(endDate, endTime);

  if (endDatetime >= startDatetime) {
    return null;
  }
  return invalidObj;
}

function _stringsToDate(dateStr: string, timeStr: string) {
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
