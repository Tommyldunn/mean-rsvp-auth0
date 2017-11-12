webpackJsonp(["admin.module"],{

/***/ "../../../../../src/app/core/forms/date-range.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dateRangeValidator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formUtils_factory__ = __webpack_require__("../../../../../src/app/core/forms/formUtils.factory.ts");

function dateRangeValidator(c) {
    // Get controls in group
    var startDateC = c.get('startDate');
    var startTimeC = c.get('startTime');
    var endDateC = c.get('endDate');
    var endTimeC = c.get('endTime');
    // Object to return if date is invalid
    var invalidObj = { 'dateRange': true };
    // If start and end dates are valid, can check range (with prefilled times)
    // Final check happens when all dates/times are valid
    if (startDateC.valid && endDateC.valid) {
        var checkStartTime = startTimeC.invalid ? '12:00 AM' : startTimeC.value;
        var checkEndTime = endTimeC.invalid ? '11:59 PM' : endTimeC.value;
        var startDatetime = Object(__WEBPACK_IMPORTED_MODULE_0__formUtils_factory__["d" /* stringsToDate */])(startDateC.value, checkStartTime);
        var endDatetime = Object(__WEBPACK_IMPORTED_MODULE_0__formUtils_factory__["d" /* stringsToDate */])(endDateC.value, checkEndTime);
        if (endDatetime >= startDatetime) {
            return null;
        }
        else {
            return invalidObj;
        }
    }
    return null;
}


/***/ }),

/***/ "../../../../../src/app/core/forms/date.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dateValidator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formUtils_factory__ = __webpack_require__("../../../../../src/app/core/forms/formUtils.factory.ts");

function dateValidator() {
    return function (control) {
        var dateStr = control.value;
        // First check for m/d/yyyy format
        // If pattern is wrong, don't validate yet
        if (!__WEBPACK_IMPORTED_MODULE_0__formUtils_factory__["a" /* DATE_REGEX */].test(dateStr)) {
            return null;
        }
        // Length of months (will update for leap years)
        var monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Object to return if date is invalid
        var invalidObj = { 'date': true };
        // Parse the date input to integers
        var dateArr = dateStr.split('/');
        var month = parseInt(dateArr[0], 10);
        var day = parseInt(dateArr[1], 10);
        var year = parseInt(dateArr[2], 10);
        // Today's date
        var now = new Date();
        // Validate year and month
        if (year < now.getFullYear() || year > 3000 || month === 0 || month > 12) {
            return invalidObj;
        }
        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLengthArr[1] = 29;
        }
        // Validate day
        if (!(day > 0 && day <= monthLengthArr[month - 1])) {
            return invalidObj;
        }
        ;
        // If date is properly formatted, check the date vs today to ensure future
        // This is done this way to account for new Date() shifting invalid
        // date strings. This way we know the string is a correct date first.
        var date = new Date(dateStr);
        if (date <= now) {
            return invalidObj;
        }
        return null;
    };
}


/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">{{pageTitle}}</h1>\n<app-loading *ngIf=\"loading\"></app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <p class=\"lead\">Welcome, {{auth.userProfile?.name}}! You can create and administer events below.</p>\n\n  <p>\n    <a\n      class=\"btn btn-success btn-block\"\n      routerLink=\"/admin/event/new\">+ Create New Event</a>\n  </p>\n\n  <!-- Events -->\n  <ng-template [ngIf]=\"eventList\">\n    <ng-template [ngIf]=\"eventList.length\">\n      <!-- Search events -->\n      <section class=\"search input-group mb-3\">\n        <label class=\"input-group-addon\" for=\"search\">Search</label>\n        <input\n          id=\"search\"\n          type=\"text\"\n          class=\"form-control\"\n          [(ngModel)]=\"query\"\n          (keyup)=\"searchEvents()\" />\n        <span class=\"input-group-btn\">\n          <button\n            class=\"btn btn-danger\"\n            (click)=\"resetQuery()\"\n            [disabled]=\"!query\">&times;</button>\n        </span>\n      </section>\n\n      <!-- No search results -->\n      <p *ngIf=\"fs.noSearchResults(filteredEvents, query)\" class=\"alert alert-warning\">\n        No events found for <em class=\"text-danger\">{{query}}</em>, sorry!\n      </p>\n\n      <!-- Events listing -->\n      <section class=\"list-group\">\n        <div\n          *ngFor=\"let event of fs.orderByDate(filteredEvents, 'startDatetime')\"\n          class=\"list-group-item list-group-item-action flex-column align-items-start\">\n          <div class=\"d-flex w-100 justify-content-between\">\n            <a [routerLink]=\"['/event', event._id]\">\n              <h5 class=\"mb-1\" [innerHTML]=\"event.title\"></h5>\n            </a>\n            <div class=\"event-icons\">\n              <img\n                *ngIf=\"!event.viewPublic\"\n                class=\"event-icon\"\n                title=\"Private\"\n                src=\"/assets/images/eye.svg\">\n              <img\n                *ngIf=\"utils.eventPast(event.endDatetime)\"\n                class=\"event-icon\"\n                title=\"Event is over\"\n                src=\"/assets/images/calendar.svg\">\n            </div>\n          </div>\n          <p class=\"mb-1\">\n            <strong>Date:</strong> {{utils.eventDates(event.startDatetime, event.endDatetime)}}\n          </p>\n          <p class=\"mb-1\">\n            <a\n              class=\"btn btn-info btn-sm\"\n              [routerLink]=\"['/admin/event/update', event._id]\">Edit</a>\n            <a\n              class=\"btn btn-danger btn-sm\"\n              [routerLink]=\"['/admin/event/update', event._id]\"\n              [queryParams]=\"{tab: 'delete'}\">Delete</a>\n          </p>\n        </div>\n      </section>\n    </ng-template>\n\n    <!-- No events available -->\n    <p *ngIf=\"!eventList.length\" class=\"alert alert-info\">\n      No events have been created yet.\n    </p>\n  </ng-template>\n\n  <!-- Error loading events -->\n  <p *ngIf=\"error\" class=\"alert alert-danger\">\n    <strong>Oops!</strong> There was an error retrieving event data.\n  </p>\n\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n    ADMIN COMPONENT\n--------------------*/\n.event-icon {\n  display: inline-block;\n  height: 16px;\n  margin: 0 4px;\n  width: 16px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_filter_sort_service__ = __webpack_require__("../../../../../src/app/core/filter-sort.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AdminComponent = (function () {
    function AdminComponent(title, auth, api, utils, fs) {
        this.title = title;
        this.auth = auth;
        this.api = api;
        this.utils = utils;
        this.fs = fs;
        this.pageTitle = 'Admin';
        this.query = '';
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.title.setTitle(this.pageTitle);
        this._getEventList();
    };
    AdminComponent.prototype._getEventList = function () {
        var _this = this;
        this.loading = true;
        // Get all (admin) events
        this.eventsSub = this.api
            .getAdminEvents$()
            .subscribe(function (res) {
            _this.eventList = res;
            _this.filteredEvents = res;
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
        });
    };
    AdminComponent.prototype.searchEvents = function () {
        this.filteredEvents = this.fs.search(this.eventList, this.query, '_id', 'mediumDate');
    };
    AdminComponent.prototype.resetQuery = function () {
        this.query = '';
        this.filteredEvents = this.eventList;
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.eventsSub.unsubscribe();
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin',
            template: __webpack_require__("../../../../../src/app/pages/admin/admin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_5__core_filter_sort_service__["a" /* FilterSortService */]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_core_module__ = __webpack_require__("../../../../../src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_routes__ = __webpack_require__("../../../../../src/app/pages/admin/admin.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_component__ = __webpack_require__("../../../../../src/app/pages/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__create_event_create_event_component__ = __webpack_require__("../../../../../src/app/pages/admin/create-event/create-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__update_event_update_event_component__ = __webpack_require__("../../../../../src/app/pages/admin/update-event/update-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__event_form_event_form_component__ = __webpack_require__("../../../../../src/app/pages/admin/event-form/event-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__update_event_delete_event_delete_event_component__ = __webpack_require__("../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__admin_routes__["a" /* ADMIN_ROUTES */])
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_6__create_event_create_event_component__["a" /* CreateEventComponent */],
                __WEBPACK_IMPORTED_MODULE_7__update_event_update_event_component__["a" /* UpdateEventComponent */],
                __WEBPACK_IMPORTED_MODULE_8__event_form_event_form_component__["a" /* EventFormComponent */],
                __WEBPACK_IMPORTED_MODULE_9__update_event_delete_event_delete_event_component__["a" /* DeleteEventComponent */]
            ]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADMIN_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_component__ = __webpack_require__("../../../../../src/app/pages/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_event_create_event_component__ = __webpack_require__("../../../../../src/app/pages/admin/create-event/create-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__update_event_update_event_component__ = __webpack_require__("../../../../../src/app/pages/admin/update-event/update-event.component.ts");



var ADMIN_ROUTES = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__admin_component__["a" /* AdminComponent */],
    },
    {
        path: 'event/new',
        component: __WEBPACK_IMPORTED_MODULE_1__create_event_create_event_component__["a" /* CreateEventComponent */]
    },
    {
        path: 'event/update/:id',
        component: __WEBPACK_IMPORTED_MODULE_2__update_event_update_event_component__["a" /* UpdateEventComponent */]
    }
];


/***/ }),

/***/ "../../../../../src/app/pages/admin/create-event/create-event.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">{{pageTitle}}</h1>\n\n<app-event-form></app-event-form>\n"

/***/ }),

/***/ "../../../../../src/app/pages/admin/create-event/create-event.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/admin/create-event/create-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateEventComponent = (function () {
    function CreateEventComponent(title) {
        this.title = title;
        this.pageTitle = 'Create Event';
    }
    CreateEventComponent.prototype.ngOnInit = function () {
        this.title.setTitle(this.pageTitle);
    };
    CreateEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-create-event',
            template: __webpack_require__("../../../../../src/app/pages/admin/create-event/create-event.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/admin/create-event/create-event.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */]])
    ], CreateEventComponent);
    return CreateEventComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/event-form/event-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"eventForm\" (ngSubmit)=\"onSubmit()\">\n  <!-- Title -->\n  <div class=\"form-group\">\n    <label for=\"title\">Title</label>\n    <input\n      id=\"title\"\n      type=\"text\"\n      class=\"form-control\"\n      formControlName=\"title\"\n      [maxlength]=\"ef.titleMax\">\n    <div\n      *ngIf=\"formErrors.title\"\n      class=\"small text-danger formErrors\"\n      [innerHTML]=\"formErrors.title\">\n    </div>\n  </div>\n\n  <!-- Location -->\n  <div class=\"form-group\">\n    <label for=\"location\">Location</label>\n    <input\n      id=\"location\"\n      type=\"text\"\n      class=\"form-control\"\n      formControlName=\"location\"\n      [maxlength]=\"ef.locMax\">\n    <div\n      *ngIf=\"formErrors.location\"\n      class=\"small text-danger formErrors\"\n      [innerHTML]=\"formErrors.location\">\n    </div>\n  </div>\n\n  <div\n    formGroupName=\"datesGroup\"\n    [ngClass]=\"{'has-danger': eventForm.get('datesGroup').errors}\">\n    <div class=\"row\">\n      <!-- Start date -->\n      <div class=\"form-group col-sm-12 col-md-6\">\n        <label for=\"startDate\">Start Date</label>\n        <input\n          id=\"startDate\"\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"startDate\"\n          [placeholder]=\"ef.dateFormat\"\n          [maxlength]=\"ef.dateMax\">\n        <div\n          *ngIf=\"formErrors.datesGroup.startDate\"\n          class=\"small text-danger formErrors\"\n          [innerHTML]=\"formErrors.datesGroup.startDate\">\n        </div>\n      </div>\n\n      <!-- Start time -->\n      <div class=\"form-group col-sm-12 col-md-6\">\n        <label for=\"startTime\">Start Time</label>\n        <input\n          id=\"startTime\"\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"startTime\"\n          [placeholder]=\"ef.timeFormat\"\n          [maxlength]=\"ef.timeMax\">\n        <div\n          *ngIf=\"formErrors.datesGroup.startTime\"\n          class=\"small text-danger formErrors\"\n          [innerHTML]=\"formErrors.datesGroup.startTime\">\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <!-- End date -->\n      <div class=\"form-group col-sm-12 col-md-6\">\n        <label for=\"endDate\">End Date</label>\n        <input\n          id=\"endDate\"\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"endDate\"\n          [placeholder]=\"ef.dateFormat\"\n          [maxlength]=\"ef.dateMax\">\n        <div\n          *ngIf=\"formErrors.datesGroup.endDate\"\n          class=\"small text-danger formErrors\"\n          [innerHTML]=\"formErrors.datesGroup.endDate\">\n        </div>\n      </div>\n\n      <!-- End time -->\n      <div class=\"form-group col-sm-12 col-md-6\">\n        <label for=\"endTime\">End Time</label>\n        <input\n          id=\"endTime\"\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"endTime\"\n          [placeholder]=\"ef.timeFormat\"\n          [maxlength]=\"ef.timeMax\">\n        <div\n          *ngIf=\"formErrors.datesGroup.endTime\"\n          class=\"small text-danger formErrors\"\n          [innerHTML]=\"formErrors.datesGroup.endTime\">\n        </div>\n      </div>\n    </div>\n\n    <p *ngIf=\"eventForm.get('datesGroup').errors\" class=\"alert alert-danger small\">\n      <strong>Dates/times out of range:</strong> Events cannot end before they begin. Please double-check the start and end dates and times.\n    </p>\n  </div>\n\n  <!-- View Public -->\n  <div class=\"form-group\">\n    <label class=\"label-inline-group\">List event publicly?</label>\n    <div class=\"form-check form-check-inline\">\n      <label class=\"form-check-label\">\n        <input\n          id=\"viewPublic-yes\"\n          type=\"radio\"\n          class=\"form-check-input\"\n          [value]=\"true\"\n          formControlName=\"viewPublic\"> Yes\n      </label>\n    </div>\n    <div class=\"form-check form-check-inline\">\n      <label class=\"form-check-label\">\n        <input\n          id=\"viewPublic-no\"\n          type=\"radio\"\n          class=\"form-check-input\"\n          [value]=\"false\"\n          formControlName=\"viewPublic\"> No\n      </label>\n    </div>\n    <div\n      *ngIf=\"formErrors.viewPublic\"\n      class=\"small text-danger formErrors\"\n      [innerHTML]=\"formErrors.viewPublic\">\n    </div>\n  </div>\n\n  <!-- Description -->\n  <div class=\"form-group\">\n    <label for=\"description\">Description:</label>\n    <textarea\n      id=\"description\"\n      class=\"form-control\"\n      rows=\"3\"\n      formControlName=\"description\"\n      [maxlength]=\"ef.descMax\"></textarea>\n    <div\n      *ngIf=\"formErrors.description\"\n      class=\"small text-danger formErrors\"\n      [innerHTML]=\"formErrors.description\">\n    </div>\n  </div>\n\n  <!-- Submit -->\n  <div class=\"form-group\">\n    <button\n      type=\"submit\"\n      class=\"btn btn-primary\"\n      [attr.disabled]=\"eventForm.invalid || submitting ? true : null\"\n      [innerText]=\"submitBtnText\"></button>\n      <!-- https://github.com/angular/angular/issues/11271#issuecomment-289806196 -->\n    <app-submitting *ngIf=\"submitting\"></app-submitting>\n    <a\n      *ngIf=\"!submitting\"\n      class=\"btn btn-link\"\n      (click)=\"resetForm()\"\n      tabindex=\"0\">Reset Form</a>\n\n    <!-- API submission error -->\n    <p *ngIf=\"error\" class=\"mt-3 alert alert-danger\">\n      <strong>Error:</strong> There was a problem submitting the event. Please try again.\n    </p>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/pages/admin/event-form/event-form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n EVENT FORM COMPONENT\n--------------------*/\n:host {\n  display: block;\n  margin-top: 20px; }\n\n.label-inline-group {\n  display: block; }\n\n.has-error {\n  border: 1px solid red; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/admin/event-form/event-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_models_event_model__ = __webpack_require__("../../../../../src/app/core/models/event.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_forms_date_validator__ = __webpack_require__("../../../../../src/app/core/forms/date.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_forms_date_range_validator__ = __webpack_require__("../../../../../src/app/core/forms/date-range.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__ = __webpack_require__("../../../../../src/app/core/forms/formUtils.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__event_form_service__ = __webpack_require__("../../../../../src/app/pages/admin/event-form/event-form.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EventFormComponent = (function () {
    function EventFormComponent(fb, api, datePipe, ef, router) {
        this.fb = fb;
        this.api = api;
        this.datePipe = datePipe;
        this.ef = ef;
        this.router = router;
    }
    EventFormComponent.prototype.ngOnInit = function () {
        this.formErrors = this.ef.formErrors;
        this.isEdit = !!this.event;
        this.submitBtnText = this.isEdit ? 'Update Event' : 'Create Event';
        // Set initial form data
        this.formEvent = this._setFormEvent();
        // Use FormBuilder to construct the form
        this._buildForm();
    };
    EventFormComponent.prototype._setFormEvent = function () {
        if (!this.isEdit) {
            // If creating a new event, create new
            // FormEventModel with default null data
            return new __WEBPACK_IMPORTED_MODULE_4__core_models_event_model__["b" /* FormEventModel */](null, null, null, null, null, null, null);
        }
        else {
            // If editing existing event, create new
            // FormEventModel from existing data
            // Transform datetimes:
            // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
            // 'shortDate': 9/3/10
            // 'shortTime': 12:05 PM
            return new __WEBPACK_IMPORTED_MODULE_4__core_models_event_model__["b" /* FormEventModel */](this.event.title, this.event.location, this.datePipe.transform(this.event.startDatetime, 'shortDate'), this.datePipe.transform(this.event.startDatetime, 'shortTime'), this.datePipe.transform(this.event.endDatetime, 'shortDate'), this.datePipe.transform(this.event.endDatetime, 'shortTime'), this.event.viewPublic, this.event.description);
        }
    };
    EventFormComponent.prototype._buildForm = function () {
        var _this = this;
        this.eventForm = this.fb.group({
            title: [this.formEvent.title, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(this.ef.textMin),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.titleMax)
                ]],
            location: [this.formEvent.location, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(this.ef.textMin),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.locMax)
                ]],
            viewPublic: [this.formEvent.viewPublic,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
            ],
            description: [this.formEvent.description,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.descMax)
            ],
            datesGroup: this.fb.group({
                startDate: [this.formEvent.startDate, [
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.dateMax),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["a" /* DATE_REGEX */]),
                        Object(__WEBPACK_IMPORTED_MODULE_6__core_forms_date_validator__["a" /* dateValidator */])()
                    ]],
                startTime: [this.formEvent.startTime, [
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.timeMax),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["c" /* TIME_REGEX */])
                    ]],
                endDate: [this.formEvent.endDate, [
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.dateMax),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["a" /* DATE_REGEX */]),
                        Object(__WEBPACK_IMPORTED_MODULE_6__core_forms_date_validator__["a" /* dateValidator */])()
                    ]],
                endTime: [this.formEvent.endTime, [
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(this.ef.timeMax),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["c" /* TIME_REGEX */])
                    ]]
            }, { validator: __WEBPACK_IMPORTED_MODULE_7__core_forms_date_range_validator__["a" /* dateRangeValidator */] })
        });
        // Set local property to eventForm datesGroup control
        this.datesGroup = this.eventForm.get('datesGroup');
        // Subscribe to form value changes
        this.formChangeSub = this.eventForm
            .valueChanges
            .subscribe(function (data) { return _this._onValueChanged(); });
        // If edit: mark fields dirty to trigger immediate
        // validation in case editing an event that is no
        // longer valid (for example, an event in the past)
        if (this.isEdit) {
            var _markDirty = function (group) {
                for (var i in group.controls) {
                    if (group.controls.hasOwnProperty(i)) {
                        group.controls[i].markAsDirty();
                    }
                }
            };
            _markDirty(this.eventForm);
            _markDirty(this.datesGroup);
        }
        this._onValueChanged();
    };
    EventFormComponent.prototype._onValueChanged = function () {
        var _this = this;
        if (!this.eventForm) {
            return;
        }
        var _setErrMsgs = function (control, errorsObj, field) {
            if (control && control.dirty && control.invalid) {
                var messages = _this.ef.validationMessages[field];
                for (var key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        errorsObj[field] += messages[key] + '<br>';
                    }
                }
            }
        };
        // Check validation and set errors
        for (var field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                if (field !== 'datesGroup') {
                    // Set errors for fields not inside datesGroup
                    // Clear previous error message (if any)
                    this.formErrors[field] = '';
                    _setErrMsgs(this.eventForm.get(field), this.formErrors, field);
                }
                else {
                    // Set errors for fields inside datesGroup
                    var datesGroupErrors = this.formErrors['datesGroup'];
                    for (var dateField in datesGroupErrors) {
                        if (datesGroupErrors.hasOwnProperty(dateField)) {
                            // Clear previous error message (if any)
                            datesGroupErrors[dateField] = '';
                            _setErrMsgs(this.datesGroup.get(dateField), datesGroupErrors, dateField);
                        }
                    }
                }
            }
        }
    };
    EventFormComponent.prototype._getSubmitObj = function () {
        var startDate = this.datesGroup.get('startDate').value;
        var startTime = this.datesGroup.get('startTime').value;
        var endDate = this.datesGroup.get('endDate').value;
        var endTime = this.datesGroup.get('endTime').value;
        // Convert form startDate/startTime and endDate/endTime
        // to JS dates and populate a new EventModel for submission
        return new __WEBPACK_IMPORTED_MODULE_4__core_models_event_model__["a" /* EventModel */](this.eventForm.get('title').value, this.eventForm.get('location').value, Object(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["d" /* stringsToDate */])(startDate, startTime), Object(__WEBPACK_IMPORTED_MODULE_8__core_forms_formUtils_factory__["d" /* stringsToDate */])(endDate, endTime), this.eventForm.get('viewPublic').value, this.eventForm.get('description').value, this.event ? this.event._id : null);
    };
    EventFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitting = true;
        this.submitEventObj = this._getSubmitObj();
        if (!this.isEdit) {
            this.submitEventSub = this.api
                .postEvent$(this.submitEventObj)
                .subscribe(function (data) { return _this._handleSubmitSuccess(data); }, function (err) { return _this._handleSubmitError(err); });
        }
        else {
            this.submitEventSub = this.api
                .editEvent$(this.event._id, this.submitEventObj)
                .subscribe(function (data) { return _this._handleSubmitSuccess(data); }, function (err) { return _this._handleSubmitError(err); });
        }
    };
    EventFormComponent.prototype._handleSubmitSuccess = function (res) {
        this.error = false;
        this.submitting = false;
        // Redirect to event detail
        this.router.navigate(['/event', res._id]);
    };
    EventFormComponent.prototype._handleSubmitError = function (err) {
        console.error(err);
        this.submitting = false;
        this.error = true;
    };
    EventFormComponent.prototype.resetForm = function () {
        this.eventForm.reset();
    };
    EventFormComponent.prototype.ngOnDestroy = function () {
        if (this.submitEventSub) {
            this.submitEventSub.unsubscribe();
        }
        this.formChangeSub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__core_models_event_model__["a" /* EventModel */])
    ], EventFormComponent.prototype, "event", void 0);
    EventFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-event-form',
            template: __webpack_require__("../../../../../src/app/pages/admin/event-form/event-form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/admin/event-form/event-form.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_9__event_form_service__["a" /* EventFormService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_9__event_form_service__["a" /* EventFormService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], EventFormComponent);
    return EventFormComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/event-form/event-form.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventFormService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventFormService = (function () {
    function EventFormService() {
        // Set up errors object
        this.formErrors = {
            title: '',
            location: '',
            viewPublic: '',
            description: '',
            datesGroup: {
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
            }
        };
        // Min/maxlength validation
        this.textMin = 3;
        this.titleMax = 36;
        this.locMax = 200;
        this.dateMax = 10;
        this.timeMax = 8;
        this.descMax = 2000;
        // Formats
        this.dateFormat = 'm/d/yyyy';
        this.timeFormat = 'h:mm AM/PM';
        this.validationMessages = {
            title: {
                required: "Title is <strong>required</strong>.",
                minlength: "Title must be " + this.textMin + " characters or more.",
                maxlength: "Title must be " + this.titleMax + " characters or less."
            },
            location: {
                required: "Location is <strong>required</strong>.",
                minlength: "Location must be " + this.textMin + " characters or more.",
                maxlength: "Location must be " + this.locMax + " characters or less."
            },
            startDate: {
                required: "Start date is <strong>required</strong>.",
                maxlength: "Start date cannot be longer than " + this.dateMax + " characters.",
                pattern: "Start date must be in the format <strong>" + this.dateFormat + "</strong>.",
                date: "Start date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>."
            },
            startTime: {
                required: "Start time is <strong>required</strong>.",
                pattern: "Start time must be a <strong>valid time</strong> in the format <strong>" + this.timeFormat + "</strong>.",
                maxlength: "Start time must be " + this.timeMax + " characters or less."
            },
            endDate: {
                required: "End date is <strong>required</strong>.",
                maxlength: "End date cannot be longer than " + this.dateMax + " characters.",
                pattern: "End date must be in the format <strong>" + this.dateFormat + "</strong>.",
                date: "End date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>."
            },
            endTime: {
                required: "End time is <strong>required</strong>.",
                pattern: "End time must be a <strong>valid time</strong> in the format <strong>" + this.timeFormat + "</strong>.",
                maxlength: "End time must be " + this.timeMax + " characters or less."
            },
            viewPublic: {
                required: "You must specify whether this event should be publicly listed."
            },
            description: {
                maxlength: "Description must be " + this.descMax + " characters or less."
            }
        };
    }
    EventFormService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], EventFormService);
    return EventFormService;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.html":
/***/ (function(module, exports) {

module.exports = "<p class=\"lead\">\n  You are deleting the \"<strong [innerHTML]=\"event.title\"></strong>\" event.\n</p>\n\n<p class=\"text-danger\">\n  Deleting this event will also remove all associated RSVPs. Please proceed with caution!\n</p>\n\n<div class=\"form-group\">\n  <label for=\"deleteEvent\">Confirm event title:</label>\n  <input\n    type=\"text\"\n    id=\"deleteEvent\"\n    class=\"form-control\"\n    [(ngModel)]=\"confirmDelete\">\n</div>\n\n<!-- Delete button -->\n<p>\n  <button\n    class=\"btn btn-danger\"\n    (click)=\"removeEvent()\"\n    [disabled]=\"confirmDelete !== event.title || submitting\">Delete Event</button>\n  <app-submitting *ngIf=\"submitting\"></app-submitting>\n</p>\n\n<!-- Error deleting event -->\n<p *ngIf=\"error\" class=\"alert alert-danger\">\n  <strong>Oops!</strong> There was an error deleting this event. Please try again.\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_models_event_model__ = __webpack_require__("../../../../../src/app/core/models/event.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DeleteEventComponent = (function () {
    function DeleteEventComponent(api, router) {
        this.api = api;
        this.router = router;
    }
    DeleteEventComponent.prototype.removeEvent = function () {
        var _this = this;
        this.submitting = true;
        // DELETE event by ID
        this.deleteSub = this.api
            .deleteEvent$(this.event._id)
            .subscribe(function (res) {
            _this.submitting = false;
            _this.error = false;
            console.log(res.message);
            // If successfully deleted event, redirect to Admin
            _this.router.navigate(['/admin']);
        }, function (err) {
            console.error(err);
            _this.submitting = false;
            _this.error = true;
        });
    };
    DeleteEventComponent.prototype.ngOnDestroy = function () {
        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__core_models_event_model__["a" /* EventModel */])
    ], DeleteEventComponent.prototype, "event", void 0);
    DeleteEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-delete-event',
            template: __webpack_require__("../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/admin/update-event/delete-event/delete-event.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], DeleteEventComponent);
    return DeleteEventComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/update-event.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">{{pageTitle}}</h1>\n\n<app-loading *ngIf=\"loading\"></app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <div *ngIf=\"event\" class=\"card\">\n    <div class=\"card-header\">\n      <ul class=\"nav nav-tabs card-header-tabs\">\n        <li class=\"nav-item\">\n          <a\n            class=\"nav-link\"\n            [routerLink]=\"[]\"\n            [queryParams]=\"{tab: 'edit'}\"\n            [ngClass]=\"{'active': utils.tabIs(tab, 'edit')}\">Edit</a>\n        </li>\n        <li class=\"nav-item\">\n          <a\n            class=\"nav-link\"\n            [routerLink]=\"[]\"\n            [queryParams]=\"{tab: 'delete'}\"\n            [ngClass]=\"{'active': utils.tabIs(tab, 'delete')}\">Delete</a>\n        </li>\n      </ul>\n    </div>\n\n    <div class=\"card-block\">\n      <!-- Edit event form -->\n      <app-event-form\n        *ngIf=\"utils.tabIs(tab, 'edit')\"\n        [event]=\"event\"></app-event-form>\n\n      <!-- Delete event -->\n      <app-delete-event\n        *ngIf=\"utils.tabIs(tab, 'delete')\"\n        [event]=\"event\"></app-delete-event>\n    </div>\n\n  </div>\n\n  <!-- Error loading event -->\n  <p *ngIf=\"error\" class=\"alert alert-danger\">\n    <strong>Error:</strong> Event data could not be retrieved. View <a routerLink=\"/admin\" class=\"alert-link\">Admin Events</a>.\n  </p>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/update-event.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/admin/update-event/update-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UpdateEventComponent = (function () {
    function UpdateEventComponent(route, auth, api, utils, title) {
        this.route = route;
        this.auth = auth;
        this.api = api;
        this.utils = utils;
        this.title = title;
        this.pageTitle = 'Update Event';
    }
    UpdateEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle(this.pageTitle);
        // Set event ID from route params and subscribe
        this.routeSub = this.route.params
            .subscribe(function (params) {
            _this._id = params['id'];
            _this._getEvent();
        });
        // Subscribe to query params to watch for tab changes
        this.tabSub = this.route.queryParams
            .subscribe(function (queryParams) {
            _this.tab = queryParams['tab'] || 'edit';
        });
    };
    UpdateEventComponent.prototype._getEvent = function () {
        var _this = this;
        this.loading = true;
        // GET event by ID
        this.eventSub = this.api
            .getEventById$(this._id)
            .subscribe(function (res) {
            _this.event = res;
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
        });
    };
    UpdateEventComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
        this.tabSub.unsubscribe();
        this.eventSub.unsubscribe();
    };
    UpdateEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-update-event',
            template: __webpack_require__("../../../../../src/app/pages/admin/update-event/update-event.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/admin/update-event/update-event.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */]])
    ], UpdateEventComponent);
    return UpdateEventComponent;
}());



/***/ })

});
//# sourceMappingURL=admin.module.chunk.js.map