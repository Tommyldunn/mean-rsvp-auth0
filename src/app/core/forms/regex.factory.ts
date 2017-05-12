// mm/dd/yyyy, m/d/yyyy
const dateRegex = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
// hh:mm am/pm, h:mm AM/PM
const timeRegex = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/);

export { dateRegex, timeRegex };