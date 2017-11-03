webpackJsonp(["common"],{

/***/ "../../../../../src/app/core/forms/formUtils.factory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GUESTS_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DATE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TIME_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stringsToDate; });
// 0-9
// https://regex101.com/r/dU0eY6/1
var GUESTS_REGEX = new RegExp(/^[0-9]$/);
// mm/dd/yyyy, m/d/yyyy
// https://regex101.com/r/7iSsmm/2
var DATE_REGEX = new RegExp(/^(\d{2}|\d)\/(\d{2}|\d)\/\d{4}$/);
// h:mm am/pm, hh:mm AM/PM
// https://regex101.com/r/j2Cfqd/1/
var TIME_REGEX = new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/);
// Converts date + time strings to a Date object.
// Date and time parameters should have already
// been validated with DATE_REGEX and TIME_REGEX.
function stringsToDate(dateStr, timeStr) {
    if (!DATE_REGEX.test(dateStr) || !TIME_REGEX.test(timeStr)) {
        console.error('Cannot convert date/time to Date object.');
        return;
    }
    var date = new Date(dateStr);
    var timeArr = timeStr.split(/[\s:]+/); // https://regex101.com/r/H4dMvA/1
    var hour = parseInt(timeArr[0], 10);
    var min = parseInt(timeArr[1], 10);
    var pm = timeArr[2].toLowerCase() === 'pm';
    if (!pm && hour === 12) {
        hour = 0;
    }
    if (pm && hour < 12) {
        hour += 12;
    }
    date.setHours(hour);
    date.setMinutes(min);
    return date;
}



/***/ }),

/***/ "../../../../../src/app/core/models/event.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FormEventModel; });
var EventModel = (function () {
    function EventModel(title, location, startDatetime, endDatetime, viewPublic, description, _id) {
        this.title = title;
        this.location = location;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.viewPublic = viewPublic;
        this.description = description;
        this._id = _id;
    }
    return EventModel;
}());
var FormEventModel = (function () {
    function FormEventModel(title, location, startDate, startTime, endDate, endTime, viewPublic, description) {
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.viewPublic = viewPublic;
        this.description = description;
    }
    return FormEventModel;
}());



/***/ })

});
//# sourceMappingURL=common.chunk.js.map