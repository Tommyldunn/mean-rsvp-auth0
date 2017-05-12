export function stringsToDate(dateStr: string, timeStr: string) {
  const timeArr = timeStr.split(/[\s:]+/);
  const date = new Date(dateStr);
  let hour = +timeArr[0];
  const min = +timeArr[1];
  const pm = timeArr[2].toLowerCase() === 'pm';

  if (pm) { hour += 12; }
  date.setHours(hour);
  date.setMinutes(min);

  return date;
}
