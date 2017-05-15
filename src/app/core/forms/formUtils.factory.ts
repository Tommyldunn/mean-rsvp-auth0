// mm/dd/yyyy, m/d/yyyy
const dateRegex = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
// hh:mm am/pm, h:mm AM/PM
const timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/);

// Convert date and time strings to a Date object
function stringsToDate(dateStr: string, timeStr: string) {
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

export { dateRegex, timeRegex, stringsToDate };
