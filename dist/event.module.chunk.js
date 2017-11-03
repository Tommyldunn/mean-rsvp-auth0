webpackJsonp(["event.module"],{

/***/ "../../../../../src/app/core/expand-collapse.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return expandCollapse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");

/*
  Component declaration:
    @Component({
      selector: 'app-anim',
      animations: [expandCollapse],
      templateUrl: './anim.component.html',
      styleUrls: ['./anim.component.scss']
    })
  Template:
    <div *ngIf="show" [@expandCollapse]>
*/
var expandCollapse = Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["j" /* trigger */])('expandCollapse', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* state */])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({
        'overflow-y': 'hidden',
        'height': '*'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* state */])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* style */])({
        'height': '0',
        'overflow-y': 'hidden'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["i" /* transition */])('* => void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('250ms ease-out')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["i" /* transition */])('void => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('250ms ease-in'))
]);


/***/ }),

/***/ "../../../../../src/app/core/models/rsvp.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RsvpModel; });
var RsvpModel = (function () {
    function RsvpModel(userId, name, eventId, attending, guests, comments, _id) {
        this.userId = userId;
        this.name = name;
        this.eventId = eventId;
        this.attending = attending;
        this.guests = guests;
        this.comments = comments;
        this._id = _id;
    }
    return RsvpModel;
}());



/***/ }),

/***/ "../../../../../src/app/pages/event/event-detail/event-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card-block\">\n  <h2 class=\"card-title text-center\">Event Details</h2>\n</div>\n\n<ul class=\"list-group list-group-flush\">\n  <li class=\"list-group-item\">\n    <strong>When:</strong>{{utils.eventDatesTimes(event.startDatetime, event.endDatetime)}}\n  </li>\n  <li class=\"list-group-item\">\n    <strong>Where:</strong>{{event.location}} (<a href=\"https://www.google.com/maps/dir//{{event.location}}\" target=\"_blank\">get directions</a>)\n  </li>\n</ul>\n\n<p\n  *ngIf=\"event.description\"\n  class=\"card-block lead\"\n  [innerHTML]=\"event.description\"></p>\n\n<div *ngIf=\"auth.isAdmin\" class=\"card-footer text-right small\">\n  <a [routerLink]=\"['/admin/event/update', event._id]\">Edit</a>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/event/event-detail/event-detail.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/event/event-detail/event-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_models_event_model__ = __webpack_require__("../../../../../src/app/core/models/event.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EventDetailComponent = (function () {
    function EventDetailComponent(utils, auth) {
        this.utils = utils;
        this.auth = auth;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__core_models_event_model__["a" /* EventModel */])
    ], EventDetailComponent.prototype, "event", void 0);
    EventDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-event-detail',
            template: __webpack_require__("../../../../../src/app/pages/event/event-detail/event-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/event/event-detail/event-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]])
    ], EventDetailComponent);
    return EventDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/event/event.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading\"></app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <h1 class=\"text-center\">{{pageTitle}}</h1>\n  <!-- Event -->\n  <ng-template [ngIf]=\"event\">\n    <!-- Event is over -->\n    <p *ngIf=\"eventPast\" class=\"alert alert-danger\">\n      <strong>This event is over.</strong>\n    </p>\n\n    <div class=\"card\">\n      <!-- Event tab navigation -->\n      <div class=\"card-header\">\n        <ul class=\"nav nav-tabs card-header-tabs\">\n          <li class=\"nav-item\">\n            <a\n              class=\"nav-link\"\n              [routerLink]=\"[]\"\n              [queryParams]=\"{tab: 'details'}\"\n              [ngClass]=\"{'active': utils.tabIs(tab, 'details')}\">Details</a>\n          </li>\n          <li class=\"nav-item\">\n            <a\n              class=\"nav-link\"\n              [routerLink]=\"[]\"\n              [queryParams]=\"{tab: 'rsvp'}\"\n              [ngClass]=\"{'active': utils.tabIs(tab, 'rsvp')}\">RSVP</a>\n          </li>\n        </ul>\n      </div>\n\n      <!-- Event detail tab -->\n      <app-event-detail\n        *ngIf=\"utils.tabIs(tab, 'details')\"\n        [event]=\"event\"></app-event-detail>\n\n      <!-- Event RSVP tab -->\n      <app-rsvp\n        *ngIf=\"utils.tabIs(tab, 'rsvp')\"\n        [eventId]=\"event._id\"\n        [eventPast]=\"eventPast\"></app-rsvp>\n    </div>\n  </ng-template>\n\n  <!-- Error loading events -->\n  <p *ngIf=\"error\" class=\"alert alert-danger\">\n    <strong>Oops!</strong> There was an error retrieving information for this event.\n  </p>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/event/event.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/event/event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventComponent; });
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






var EventComponent = (function () {
    function EventComponent(route, auth, api, utils, title) {
        this.route = route;
        this.auth = auth;
        this.api = api;
        this.utils = utils;
        this.title = title;
    }
    EventComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Set event ID from route params and subscribe
        this.routeSub = this.route.params
            .subscribe(function (params) {
            _this.id = params['id'];
            _this._getEvent();
        });
        // Subscribe to query params to watch for tab changes
        this.tabSub = this.route.queryParams
            .subscribe(function (queryParams) {
            _this.tab = queryParams['tab'] || 'details';
        });
    };
    EventComponent.prototype._getEvent = function () {
        var _this = this;
        this.loading = true;
        // GET event by ID
        this.eventSub = this.api
            .getEventById$(this.id)
            .subscribe(function (res) {
            _this.event = res;
            _this._setPageTitle(_this.event.title);
            _this.loading = false;
            _this.eventPast = _this.utils.eventPast(_this.event.endDatetime);
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
            _this._setPageTitle('Event Details');
        });
    };
    EventComponent.prototype._setPageTitle = function (title) {
        this.pageTitle = title;
        this.title.setTitle(title);
    };
    EventComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
        this.tabSub.unsubscribe();
        this.eventSub.unsubscribe();
    };
    EventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-event',
            template: __webpack_require__("../../../../../src/app/pages/event/event.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/event/event.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */]])
    ], EventComponent);
    return EventComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/event/event.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventModule", function() { return EventModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_core_module__ = __webpack_require__("../../../../../src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_routes__ = __webpack_require__("../../../../../src/app/pages/event/event.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_component__ = __webpack_require__("../../../../../src/app/pages/event/event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_detail_event_detail_component__ = __webpack_require__("../../../../../src/app/pages/event/event-detail/event-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rsvp_rsvp_component__ = __webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rsvp_rsvp_form_rsvp_form_component__ = __webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var EventModule = (function () {
    function EventModule() {
    }
    EventModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__event_routes__["a" /* EVENT_ROUTES */])
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__event_component__["a" /* EventComponent */],
                __WEBPACK_IMPORTED_MODULE_6__event_detail_event_detail_component__["a" /* EventDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_7__rsvp_rsvp_component__["a" /* RsvpComponent */],
                __WEBPACK_IMPORTED_MODULE_8__rsvp_rsvp_form_rsvp_form_component__["a" /* RsvpFormComponent */]
            ]
        })
    ], EventModule);
    return EventModule;
}());



/***/ }),

/***/ "../../../../../src/app/pages/event/event.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EVENT_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_component__ = __webpack_require__("../../../../../src/app/pages/event/event.component.ts");

var EVENT_ROUTES = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__event_component__["a" /* EventComponent */]
    }
];


/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\" #rsvpForm=\"ngForm\">\n  <!-- Name -->\n  <div class=\"form-group\">\n    <label for=\"name\">Name</label>\n    <input\n      id=\"name\"\n      name=\"name\"\n      type=\"text\"\n      class=\"form-control\"\n      minlength=\"3\"\n      maxlength=\"24\"\n      #name=\"ngModel\"\n      [(ngModel)]=\"formRsvp.name\"\n      required>\n    <div\n      *ngIf=\"name.errors && name.dirty\"\n      class=\"small text-danger formErrors\">\n      <div [hidden]=\"!name.errors.required\">\n        Name is <strong>required</strong>.\n      </div>\n      <div [hidden]=\"!name.errors.minlength\">\n        Name must be 3 characters or more.\n      </div>\n    </div>\n  </div>\n\n  <!-- Attending -->\n  <div class=\"form-group\">\n    <label class=\"label-inline-group\">Will you be attending?</label>\n    <div class=\"form-check form-check-inline\">\n      <label class=\"form-check-label\">\n        <input\n          id=\"attending-yes\"\n          name=\"attending\"\n          type=\"radio\"\n          class=\"form-check-input\"\n          (change)=\"changeAttendanceSetGuests()\"\n          [value]=\"true\"\n          [(ngModel)]=\"formRsvp.attending\"\n          required> Yes\n      </label>\n    </div>\n    <div class=\"form-check form-check-inline\">\n      <label class=\"form-check-label\">\n        <input\n          id=\"attending-no\"\n          name=\"attending\"\n          type=\"radio\"\n          class=\"form-check-input\"\n          (change)=\"changeAttendanceSetGuests()\"\n          [value]=\"false\"\n          [(ngModel)]=\"formRsvp.attending\"\n          required> No\n      </label>\n    </div>\n  </div>\n\n  <!-- Guests -->\n  <div *ngIf=\"formRsvp.attending\" class=\"formGuests form-group row\">\n    <label for=\"guests\" class=\"col-12\">Additional Guests:</label>\n    <input\n      id=\"guests\"\n      name=\"guests\"\n      type=\"number\"\n      class=\"form-control col-sm-12 col-md-3\"\n      maxlength=\"1\"\n      [pattern]=\"GUESTS_REGEX\"\n      step=\"1\"\n      min=\"0\"\n      max=\"9\"\n      #guests=\"ngModel\"\n      [(ngModel)]=\"formRsvp.guests\">\n    <div\n      *ngIf=\"guests.errors && guests.dirty\"\n      class=\"col-12 small text-danger formErrors\">\n      <div [hidden]=\"!guests.errors.pattern\">\n        Additional Guests must be an integer from <strong>0-9</strong>.\n      </div>\n    </div>\n  </div>\n\n  <!-- Comments -->\n  <div class=\"form-group\">\n    <label for=\"comments\">Comments:</label>\n    <textarea\n      id=\"comments\"\n      name=\"comments\"\n      class=\"form-control\"\n      rows=\"2\"\n      maxlength=\"300\"\n      [(ngModel)]=\"formRsvp.comments\"></textarea>\n  </div>\n\n  <!-- Submit -->\n  <div class=\"form-group\">\n    <button\n      type=\"submit\"\n      class=\"btn btn-primary\"\n      [disabled]=\"!rsvpForm.form.valid || submitting\">Submit RSVP</button>\n    <app-submitting *ngIf=\"submitting\"></app-submitting>\n\n    <!-- API submission error -->\n    <p *ngIf=\"error\" class=\"mt-3 alert alert-danger\">\n      <strong>Error:</strong> There was a problem submitting your response. Please try again.\n    </p>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n RSVP FORM COMPONENT\n--------------------*/\n:host {\n  display: block;\n  margin-top: 20px; }\n\n.formGuests.row {\n  margin-left: 0;\n  margin-right: 0; }\n\n.formGuests label,\n.formGuests .formErrors.col-12 {\n  padding-left: 0;\n  padding-right: 0; }\n\n.label-inline-group {\n  display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RsvpFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_models_rsvp_model__ = __webpack_require__("../../../../../src/app/core/models/rsvp.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_forms_formUtils_factory__ = __webpack_require__("../../../../../src/app/core/forms/formUtils.factory.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RsvpFormComponent = (function () {
    function RsvpFormComponent(auth, api) {
        this.auth = auth;
        this.api = api;
        this.submitRsvp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.GUESTS_REGEX = __WEBPACK_IMPORTED_MODULE_4__core_forms_formUtils_factory__["b" /* GUESTS_REGEX */];
    }
    RsvpFormComponent.prototype.ngOnInit = function () {
        this.isEdit = !!this.rsvp;
        this._setFormRsvp();
    };
    RsvpFormComponent.prototype._setFormRsvp = function () {
        if (!this.isEdit) {
            // If creating a new RSVP,
            // create new RsvpModel with default data
            this.formRsvp = new __WEBPACK_IMPORTED_MODULE_3__core_models_rsvp_model__["a" /* RsvpModel */](this.auth.userProfile.sub, this.auth.userProfile.name, this.eventId, null, 0);
        }
        else {
            // If editing an existing RSVP,
            // create new RsvpModel from existing data
            this.formRsvp = new __WEBPACK_IMPORTED_MODULE_3__core_models_rsvp_model__["a" /* RsvpModel */](this.rsvp.userId, this.rsvp.name, this.rsvp.eventId, this.rsvp.attending, this.rsvp.guests, this.rsvp.comments, this.rsvp._id);
        }
    };
    RsvpFormComponent.prototype.changeAttendanceSetGuests = function () {
        // If attendance changed to no, set guests: 0
        if (!this.formRsvp.attending) {
            this.formRsvp.guests = 0;
        }
    };
    RsvpFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitting = true;
        if (!this.isEdit) {
            this.submitRsvpSub = this.api
                .postRsvp$(this.formRsvp)
                .subscribe(function (data) { return _this._handleSubmitSuccess(data); }, function (err) { return _this._handleSubmitError(err); });
        }
        else {
            this.submitRsvpSub = this.api
                .editRsvp$(this.rsvp._id, this.formRsvp)
                .subscribe(function (data) { return _this._handleSubmitSuccess(data); }, function (err) { return _this._handleSubmitError(err); });
        }
    };
    RsvpFormComponent.prototype._handleSubmitSuccess = function (res) {
        var eventObj = {
            isEdit: this.isEdit,
            rsvp: res
        };
        this.submitRsvp.emit(eventObj);
        this.error = false;
        this.submitting = false;
    };
    RsvpFormComponent.prototype._handleSubmitError = function (err) {
        var eventObj = {
            isEdit: this.isEdit,
            error: err
        };
        this.submitRsvp.emit(eventObj);
        console.error(err);
        this.submitting = false;
        this.error = true;
    };
    RsvpFormComponent.prototype.ngOnDestroy = function () {
        if (this.submitRsvpSub) {
            this.submitRsvpSub.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RsvpFormComponent.prototype, "eventId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__core_models_rsvp_model__["a" /* RsvpModel */])
    ], RsvpFormComponent.prototype, "rsvp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], RsvpFormComponent.prototype, "submitRsvp", void 0);
    RsvpFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-rsvp-form',
            template: __webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp-form/rsvp-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__core_api_service__["a" /* ApiService */]])
    ], RsvpFormComponent);
    return RsvpFormComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card-block\">\n  <h2 class=\"card-title text-center\">RSVP</h2>\n  <app-loading *ngIf=\"loading\"></app-loading>\n</div>\n\n<!-- Event is over -->\n<p *ngIf=\"eventPast\" class=\"card-block lead\">\n  You cannot RSVP to an event that has already ended.\n</p>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <ng-template [ngIf]=\"!eventPast && rsvps\">\n\n    <!-- User has RSVPed -->\n    <ng-template [ngIf]=\"userRsvp\">\n      <p class=\"card-block lead\">You responded to this event with the following information:</p>\n\n      <ul *ngIf=\"!showEditForm\" class=\"list-group list-group-flush\">\n        <li class=\"list-group-item\">\n          <strong>Name:</strong>{{userRsvp.name}}\n        </li>\n        <li class=\"list-group-item\">\n          <strong>Attending:</strong>{{utils.booleanToText(userRsvp.attending)}}\n        </li>\n        <li *ngIf=\"userRsvp.attending && userRsvp.guests\" class=\"list-group-item\">\n          <strong>Additional Guests:</strong>{{userRsvp.guests}}\n        </li>\n        <li *ngIf=\"userRsvp.comments\" class=\"list-group-item\">\n          <strong>Comments:</strong><span [innerHTML]=\"userRsvp.comments\"></span>\n        </li>\n      </ul>\n\n      <div class=\"card-block\">\n        <button\n          class=\"btn btn-info\"\n          [ngClass]=\"{'btn-info': !showEditForm, 'btn-warning': showEditForm}\"\n          (click)=\"toggleEditForm()\">{{editBtnText}}</button>\n\n        <app-rsvp-form\n          *ngIf=\"showEditForm\"\n          [eventId]=\"eventId\"\n          [rsvp]=\"userRsvp\"\n          (submitRsvp)=\"onSubmitRsvp($event)\"></app-rsvp-form>\n      </div>\n    </ng-template>\n\n    <!-- No RSVP yet -->\n    <div *ngIf=\"!userRsvp\" class=\"card-block\">\n      <p class=\"lead\">Fill out the form below to respond:</p>\n\n      <app-rsvp-form\n        [eventId]=\"eventId\"\n        (submitRsvp)=\"onSubmitRsvp($event)\"></app-rsvp-form>\n    </div>\n  </ng-template>\n\n  <!-- All RSVPs -->\n  <div class=\"card-block text-right\">\n    <button (click)=\"toggleShowRsvps()\" class=\"btn btn-link btn-sm\">{{showRsvpsText}}</button>\n  </div>\n\n  <section class=\"allRsvps\" *ngIf=\"showAllRsvps\" [@expandCollapse]>\n    <div class=\"card-block\">\n      <h3 class=\"card-title text-center\">All RSVPs</h3>\n      <p *ngIf=\"!rsvps.length\" class=\"lead\">There are currently no RSVPs for this event.</p>\n    </div>\n\n    <ul *ngIf=\"rsvps.length\" class=\"list-group list-group-flush\">\n      <li class=\"list-group-item list-group-item-success justify-content-between\">\n        <strong>Attending</strong>\n        <span class=\"badge badge-success badge-pill\">{{totalAttending}}</span>\n      </li>\n      <li\n        *ngFor=\"let rsvp of fs.filter(rsvps, 'attending', true)\"\n        class=\"list-group-item small\">\n        {{rsvp.name}} {{utils.showPlusOnes(rsvp.guests)}}\n        <p *ngIf=\"auth.isAdmin && rsvp.comments\" class=\"d-flex w-100\">\n          <em [innerHTML]=\"rsvp.comments\"></em>\n        </p>\n      </li>\n      <li class=\"list-group-item list-group-item-danger justify-content-between\">\n        <strong>Not Attending</strong>\n        <span class=\"badge badge-danger badge-pill\">{{fs.filter(rsvps, 'attending', false).length}}</span>\n      </li>\n      <li\n        *ngFor=\"let rsvp of fs.filter(rsvps, 'attending', false)\"\n        class=\"list-group-item small\">\n        {{rsvp.name}}\n        <p *ngIf=\"auth.isAdmin && rsvp.comments\" class=\"d-flex w-100\">\n          <em [innerHTML]=\"rsvp.comments\"></em>\n        </p>\n      </li>\n    </ul>\n  </section>\n\n  <!-- Error loading RSVPs -->\n  <div *ngIf=\"error\" class=\"card-block\">\n    <p class=\"alert alert-danger\">\n      <strong>Oops!</strong> There was an error retrieving RSVPs for this event.\n    </p>\n  </div>\n</ng-template>\n\n<!-- Footer showing # of total attending guests -->\n<div class=\"card-footer text-right\">\n  <small *ngIf=\"totalAttending >= 0\" class=\"text-muted\">{{utils.displayCount(totalAttending)}} {{footerTense}}</small>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n    RSVP COMPONENT\n--------------------*/\n.list-group-item p:last-child {\n  margin-bottom: 0; }\n\n.card-block.lead {\n  margin-bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/event/rsvp/rsvp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RsvpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_expand_collapse_animation__ = __webpack_require__("../../../../../src/app/core/expand-collapse.animation.ts");
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






var RsvpComponent = (function () {
    function RsvpComponent(auth, api, utils, fs) {
        this.auth = auth;
        this.api = api;
        this.utils = utils;
        this.fs = fs;
        this.showAllRsvps = false;
        this.showRsvpsText = 'View All RSVPs';
    }
    RsvpComponent.prototype.ngOnInit = function () {
        this.footerTense = !this.eventPast ? 'plan to attend this event.' : 'attended this event.';
        this._getRSVPs();
        this.toggleEditForm(false);
    };
    RsvpComponent.prototype._getRSVPs = function () {
        var _this = this;
        this.loading = true;
        // Get RSVPs by event ID
        this.rsvpsSub = this.api
            .getRsvpsByEventId$(this.eventId)
            .subscribe(function (res) {
            _this.rsvps = res;
            _this._updateRsvpState();
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
        });
    };
    RsvpComponent.prototype.toggleEditForm = function (setVal) {
        this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
        this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My RSVP';
    };
    RsvpComponent.prototype.toggleShowRsvps = function () {
        this.showAllRsvps = !this.showAllRsvps;
        this.showRsvpsText = this.showAllRsvps ? 'Hide RSVPs' : 'Show All RSVPs';
    };
    RsvpComponent.prototype.onSubmitRsvp = function (e) {
        if (e.rsvp) {
            this.userRsvp = e.rsvp;
            this._updateRsvpState(true);
            this.toggleEditForm(false);
        }
    };
    RsvpComponent.prototype._updateRsvpState = function (changed) {
        var _this = this;
        // If RSVP matching user ID is already
        // in RSVP array, set as initial RSVP
        var _initialUserRsvp = this.rsvps.filter(function (rsvp) {
            return rsvp.userId === _this.auth.userProfile.sub;
        })[0];
        // If user has not RSVPed before and has made
        // a change, push new RSVP to local RSVPs store
        if (!_initialUserRsvp && this.userRsvp && changed) {
            this.rsvps.push(this.userRsvp);
        }
        this._setUserRsvpGetAttending(changed);
    };
    RsvpComponent.prototype._setUserRsvpGetAttending = function (changed) {
        var _this = this;
        // Iterate over RSVPs to get/set user's RSVP
        // and get total number of attending guests
        var guests = 0;
        var rsvpArr = this.rsvps.map(function (rsvp) {
            // If user has an existing RSVP
            if (rsvp.userId === _this.auth.userProfile.sub) {
                if (changed) {
                    // If user edited their RSVP, set with updated data
                    rsvp = _this.userRsvp;
                }
                else {
                    // If no changes were made, set userRsvp property
                    // (This applies on ngOnInit)
                    _this.userRsvp = rsvp;
                }
            }
            // Count total number of attendees
            // + additional guests
            if (rsvp.attending) {
                guests++;
                if (rsvp.guests) {
                    guests += rsvp.guests;
                }
            }
            return rsvp;
        });
        this.rsvps = rsvpArr;
        this.totalAttending = guests;
    };
    RsvpComponent.prototype.ngOnDestroy = function () {
        this.rsvpsSub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RsvpComponent.prototype, "eventId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], RsvpComponent.prototype, "eventPast", void 0);
    RsvpComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-rsvp',
            animations: [__WEBPACK_IMPORTED_MODULE_1__core_expand_collapse_animation__["a" /* expandCollapse */]],
            template: __webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/event/rsvp/rsvp.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_5__core_filter_sort_service__["a" /* FilterSortService */]])
    ], RsvpComponent);
    return RsvpComponent;
}());



/***/ })

});
//# sourceMappingURL=event.module.chunk.js.map