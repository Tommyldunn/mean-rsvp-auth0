// MM/DD/YYYY, M/D/YYYY
const dateRegex = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
// HH:MM am/pm, HH:MM AM/PM
const timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/);

// Convert date and time strings to a Date object
function stringsToDate(dateStr: string, timeStr: string) {
  const timeArr = timeStr.split(/[\s:]+/);
  const date = new Date(dateStr);
  let hour = parseInt(timeArr[0], 10);
  const min = parseInt(timeArr[1], 10);
  const pm = timeArr[2].toLowerCase() === 'pm';

  if (pm && hour < 12) {
    hour += 12;
  }
  date.setHours(hour);
  date.setMinutes(min);

  return date;
}

export { dateRegex, timeRegex, stringsToDate };
