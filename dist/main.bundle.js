webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/admin/admin.module": [
		"../../../../../src/app/pages/admin/admin.module.ts",
		"admin.module",
		"common"
	],
	"./pages/event/event.module": [
		"../../../../../src/app/pages/event/event.module.ts",
		"event.module",
		"common"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_admin_guard__ = __webpack_require__("../../../../../src/app/auth/admin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home_component__ = __webpack_require__("../../../../../src/app/pages/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_callback_callback_component__ = __webpack_require__("../../../../../src/app/pages/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_my_rsvps_my_rsvps_component__ = __webpack_require__("../../../../../src/app/pages/my-rsvps/my-rsvps.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Route guards


// Page components



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'callback',
        component: __WEBPACK_IMPORTED_MODULE_5__pages_callback_callback_component__["a" /* CallbackComponent */]
    },
    {
        path: 'event/:id',
        loadChildren: './pages/event/event.module#EventModule',
        canActivate: [
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */]
        ]
    },
    {
        path: 'my-rsvps',
        component: __WEBPACK_IMPORTED_MODULE_6__pages_my_rsvps_my_rsvps_component__["a" /* MyRsvpsComponent */],
        canActivate: [
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */]
        ]
    },
    {
        path: 'admin',
        loadChildren: './pages/admin/admin.module#AdminModule',
        canActivate: [
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_3__auth_admin_guard__["a" /* AdminGuard */]
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forRoot(routes)],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_3__auth_admin_guard__["a" /* AdminGuard */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-overflow\">\n  <div\n    class=\"layout-canvas\"\n    [ngClass]=\"{'nav-open': navOpen, 'nav-closed': !navOpen}\"\n    [style.min-height]=\"minHeight\">\n\n    <!-- HEADER -->\n    <app-header (navToggled)=\"navToggledHandler($event)\"></app-header>\n\n    <!-- CONTENT -->\n    <div id=\"layout-view\" class=\"layout-view\">\n      <router-outlet></router-outlet>\n    </div>\n\n    <!-- FOOTER -->\n    <app-footer></app-footer>\n\n  </div> <!-- /.layout-canvas -->\n</div> <!-- /.layout-overflow -->\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n    APP COMPONENT\n--------------------*/\n/*--------------------\n   LAYOUT VARIABLES\n--------------------*/\n/*--------------------\n      RESPONSIVE\n--------------------*/\n/*-- Variables --*/\n/*-- Mixins --*/\n.layout-overflow {\n  overflow: hidden;\n  /* necessary to handle offcanvas scrollbar behavior */ }\n\n.layout-canvas {\n  background: #fff;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  /* Safari: http://caniuse.com/#search=css3%203d */\n  position: relative;\n  left: 0;\n  transition: -webkit-transform 250ms ease;\n  transition: transform 250ms ease;\n  transition: transform 250ms ease, -webkit-transform 250ms ease;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  width: 100%; }\n  .layout-canvas.nav-open {\n    -webkit-transform: translate3d(270px, 0, 0);\n            transform: translate3d(270px, 0, 0); }\n\n.layout-view {\n  padding: 3%; }\n  @media screen and (min-width: 768px) {\n    .layout-view {\n      margin: 0 auto;\n      max-width: 960px;\n      padding: 1.5% 3%; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(auth) {
        this.auth = auth;
        this._initWinHeight = 0;
        // Check for authentication and handle if hash present
        auth.handleAuth();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].fromEvent(window, 'resize')
            .debounceTime(200)
            .subscribe(function (event) { return _this._resizeFn(event); });
        this._initWinHeight = window.innerHeight;
        this._resizeFn(null);
    };
    AppComponent.prototype.navToggledHandler = function (e) {
        this.navOpen = e;
    };
    AppComponent.prototype._resizeFn = function (e) {
        var winHeight = e ? e.target.innerHeight : this._initWinHeight;
        this.minHeight = winHeight + "px";
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_module__ = __webpack_require__("../../../../../src/app/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_core_module__ = __webpack_require__("../../../../../src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home_component__ = __webpack_require__("../../../../../src/app/pages/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_callback_callback_component__ = __webpack_require__("../../../../../src/app/pages/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_my_rsvps_my_rsvps_component__ = __webpack_require__("../../../../../src/app/pages/my-rsvps/my-rsvps.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__pages_callback_callback_component__["a" /* CallbackComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_my_rsvps_my_rsvps_component__["a" /* MyRsvpsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__auth_auth_module__["a" /* AuthModule */],
                __WEBPACK_IMPORTED_MODULE_4__core_core_module__["a" /* CoreModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth/admin.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminGuard = (function () {
    function AdminGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function () {
        if (this.auth.isAdmin) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    };
    AdminGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AdminGuard);
    return AdminGuard;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_CONFIG; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_env_config__ = __webpack_require__("../../../../../src/app/core/env.config.ts");

;
var AUTH_CONFIG = {
    CLIENT_ID: 'ROP6VPKhSPtM1MMeK2dAVSEXX3XDnH20',
    CLIENT_DOMAIN: 'kmaida.auth0.com',
    AUDIENCE: 'http://localhost:8083/api/',
    REDIRECT: __WEBPACK_IMPORTED_MODULE_0__core_env_config__["a" /* ENV */].BASE_URI + "/callback",
    SILENT_REDIRECT: __WEBPACK_IMPORTED_MODULE_0__core_env_config__["a" /* ENV */].BASE_URI + "/silent",
    SCOPE: 'openid profile',
    NAMESPACE: 'http://myapp.com/roles'
};


/***/ }),

/***/ "../../../../../src/app/auth/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(auth) {
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.tokenValid) {
            return true;
        }
        else {
            // Send guarded route to redirect to after logging in
            this.auth.login(state.url);
            return false;
        }
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_config__ = __webpack_require__("../../../../../src/app/auth/auth.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js__ = __webpack_require__("../../../../auth0-js/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function () {
    function AuthService(router) {
        this.router = router;
        // Create Auth0 web auth instance
        this._auth0 = new __WEBPACK_IMPORTED_MODULE_4_auth0_js__["WebAuth"]({
            clientID: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].CLIENT_ID,
            domain: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].CLIENT_DOMAIN,
            responseType: 'token id_token',
            redirectUri: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].REDIRECT,
            audience: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].AUDIENCE,
            scope: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].SCOPE
        });
        this.loggedIn$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.loggedIn);
        // If authenticated, set local profile property,
        // admin status, update login status, schedule renewal.
        // If not authenticated but there are still items
        // in localStorage, log out.
        var lsProfile = localStorage.getItem('profile');
        if (this.tokenValid) {
            this.userProfile = JSON.parse(lsProfile);
            this.isAdmin = localStorage.getItem('isAdmin') === 'true';
            this.setLoggedIn(true);
            this.scheduleRenewal();
        }
        else if (this.tokenValid === false && lsProfile) {
            this.logout();
        }
    }
    AuthService.prototype.setLoggedIn = function (value) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    };
    AuthService.prototype.login = function (redirect) {
        // Set redirect after login
        var _redirect = redirect ? redirect : this.router.url;
        localStorage.setItem('authRedirect', _redirect);
        // Auth0 authorize request
        this._auth0.authorize();
    };
    AuthService.prototype.handleAuth = function () {
        var _this = this;
        // When Auth0 hash parsed, get profile
        this._auth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                _this._getProfile(authResult);
            }
            else if (err) {
                _this._clearRedirect();
                _this.router.navigate(['/']);
                console.error("Error authenticating: " + err.error);
            }
        });
    };
    AuthService.prototype._getProfile = function (authResult) {
        var _this = this;
        // Use access token to retrieve user's profile and set session
        this._auth0.client.userInfo(authResult.accessToken, function (err, profile) {
            if (profile) {
                _this._setSession(authResult, profile);
                _this._redirect();
                _this._clearRedirect();
            }
            else if (err) {
                console.warn("Error retrieving profile: " + err.error);
            }
        });
    };
    AuthService.prototype._setSession = function (authResult, profile) {
        // Set tokens and expiration in localStorage
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // If initial login, set profile and admin information
        if (profile) {
            localStorage.setItem('profile', JSON.stringify(profile));
            this.userProfile = profile;
            this.isAdmin = this._checkAdmin(profile);
            localStorage.setItem('isAdmin', this.isAdmin.toString());
        }
        // Update login status in loggedIn$ stream
        this.setLoggedIn(true);
        // Schedule access token renewal
        this.scheduleRenewal();
    };
    AuthService.prototype._checkAdmin = function (profile) {
        // Check if the user has admin role
        var roles = profile[__WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].NAMESPACE] || [];
        return roles.indexOf('admin') > -1;
    };
    AuthService.prototype._redirect = function () {
        // Redirect with or without 'tab' query parameter
        // Note: does not support additional params besides 'tab'
        var fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
        var redirectArr = fullRedirect.split('?tab=');
        var navArr = [redirectArr[0] || '/'];
        var tabObj = redirectArr[1] ? { queryParams: { tab: redirectArr[1] } } : null;
        if (!tabObj) {
            this.router.navigate(navArr);
        }
        else {
            this.router.navigate(navArr, tabObj);
        }
    };
    AuthService.prototype._clearRedirect = function () {
        // Remove redirect from localStorage
        localStorage.removeItem('authRedirect');
    };
    AuthService.prototype.logout = function (noRedirect) {
        // Ensure all auth items removed from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('expires_at');
        this._clearRedirect();
        // Reset local properties, update loggedIn$ stream
        this.userProfile = undefined;
        this.isAdmin = undefined;
        this.setLoggedIn(false);
        // Unschedule access token renewal
        this.unscheduleRenewal();
        // Return to homepage
        if (noRedirect !== true) {
            this.router.navigate(['/']);
        }
    };
    Object.defineProperty(AuthService.prototype, "tokenValid", {
        get: function () {
            // Check if current time is past access token's expiration
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return Date.now() < expiresAt;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.renewToken = function () {
        var _this = this;
        this._auth0.renewAuth({
            redirectUri: __WEBPACK_IMPORTED_MODULE_3__auth_config__["a" /* AUTH_CONFIG */].SILENT_REDIRECT,
            usePostMessage: true
        }, function (err, authResult) {
            if (authResult && authResult.accessToken) {
                _this._setSession(authResult);
            }
            else if (err) {
                console.warn("Could not renew token: " + err.errorDescription);
                // Log out without redirecting to clear auth data
                _this.logout(true);
                // Log in again
                _this.login();
            }
        });
    };
    AuthService.prototype.scheduleRenewal = function () {
        var _this = this;
        // If user isn't authenticated, do nothing
        if (!this.tokenValid) {
            return;
        }
        // Unsubscribe from previous expiration observable
        this.unscheduleRenewal();
        // Create and subscribe to expiration observable
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        var expiresIn$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["a" /* Observable */].of(expiresAt)
            .flatMap(function (expires) {
            var now = Date.now();
            // Use timer to track delay until expiration
            // to run the refresh at the proper time
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["a" /* Observable */].timer(Math.max(1, expires - now));
        });
        this.refreshSub = expiresIn$
            .subscribe(function () {
            _this.renewToken();
            _this.scheduleRenewal();
        });
    };
    AuthService.prototype.unscheduleRenewal = function () {
        if (this.refreshSub) {
            this.refreshSub.unsubscribe();
        }
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/core/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__env_config__ = __webpack_require__("../../../../../src/app/core/env.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = (function () {
    function ApiService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    Object.defineProperty(ApiService.prototype, "_authHeader", {
        get: function () {
            return "Bearer " + localStorage.getItem('access_token');
        },
        enumerable: true,
        configurable: true
    });
    // GET list of public, future events
    ApiService.prototype.getEvents$ = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "events")
            .catch(this._handleError);
    };
    // GET all events - private and public (admin only)
    ApiService.prototype.getAdminEvents$ = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "events/admin", {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // GET an event by ID (login required)
    ApiService.prototype.getEventById$ = function (id) {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "event/" + id, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // GET RSVPs by event ID (login required)
    ApiService.prototype.getRsvpsByEventId$ = function (eventId) {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "event/" + eventId + "/rsvps", {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // POST new event (admin only)
    ApiService.prototype.postEvent$ = function (event) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "event/new", event, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // PUT existing event (admin only)
    ApiService.prototype.editEvent$ = function (id, event) {
        return this.http
            .put(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "event/" + id, event, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // DELETE existing event and all associated RSVPs (admin only)
    ApiService.prototype.deleteEvent$ = function (id) {
        return this.http
            .delete(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "event/" + id, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // GET all events a specific user has RSVPed to (login required)
    ApiService.prototype.getUserEvents$ = function (userId) {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "events/" + userId, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // POST new RSVP (login required)
    ApiService.prototype.postRsvp$ = function (rsvp) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "rsvp/new", rsvp, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    // PUT existing RSVP (login required)
    ApiService.prototype.editRsvp$ = function (id, rsvp) {
        return this.http
            .put(__WEBPACK_IMPORTED_MODULE_5__env_config__["a" /* ENV */].BASE_API + "rsvp/" + id, rsvp, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', this._authHeader)
        })
            .catch(this._handleError);
    };
    ApiService.prototype._handleError = function (err) {
        var errorMsg = err.message || 'Error: Unable to complete request.';
        if (err.message && err.message.indexOf('No JWT present') > -1 || err.message.indexOf('UnauthorizedError') > -1) {
            this.auth.logout(true);
            this.auth.login();
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["a" /* Observable */].throw(errorMsg);
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filter_sort_service__ = __webpack_require__("../../../../../src/app/core/filter-sort.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__forms_submitting_component__ = __webpack_require__("../../../../../src/app/core/forms/submitting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__loading_component__ = __webpack_require__("../../../../../src/app/core/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var CoreModule = (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* ReactiveFormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__loading_component__["a" /* LoadingComponent */],
                __WEBPACK_IMPORTED_MODULE_9__forms_submitting_component__["a" /* SubmittingComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_6__api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_7__utils_service__["a" /* UtilsService */],
                __WEBPACK_IMPORTED_MODULE_8__filter_sort_service__["a" /* FilterSortService */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__loading_component__["a" /* LoadingComponent */],
                __WEBPACK_IMPORTED_MODULE_9__forms_submitting_component__["a" /* SubmittingComponent */]
            ]
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "../../../../../src/app/core/env.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENV; });
var _isDev = window.location.port.indexOf('4200') > -1;
var getHost = function () {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host;
};
var apiURI = _isDev ? 'http://localhost:8083/api/' : "/api/";
var ENV = {
    BASE_URI: getHost(),
    BASE_API: apiURI
};


/***/ }),

/***/ "../../../../../src/app/core/filter-sort.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSortService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterSortService = (function () {
    function FilterSortService(datePipe) {
        this.datePipe = datePipe;
    }
    FilterSortService.prototype._objArrayCheck = function (array) {
        // Checks if the first item in the array is an object
        // (assumes same-shape for all array items)
        // Necessary because some arrays passed in may have
        // models that don't match {[key: string]: any}[]
        // This check prevents uncaught reference errors
        var item0 = array[0];
        var check = !!(array.length && item0 !== null && Object.prototype.toString.call(item0) === '[object Object]');
        return check;
    };
    FilterSortService.prototype.filter = function (array, property, value) {
        // Return only items with specific key/value pair
        if (!property || value === undefined || !this._objArrayCheck(array)) {
            return array;
        }
        var filteredArray = array.filter(function (item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    if (key === property && item[key] === value) {
                        return true;
                    }
                }
            }
        });
        return filteredArray;
    };
    FilterSortService.prototype.search = function (array, query, excludeProps, dateFormat) {
        var _this = this;
        // Match query to strings and Date objects / ISO UTC strings
        // Optionally exclude properties from being searched
        // If matching dates, can optionally pass in date format string
        if (!query || !this._objArrayCheck(array)) {
            return array;
        }
        var lQuery = query.toLowerCase();
        var isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
        var dateF = dateFormat ? dateFormat : 'medium';
        var filteredArray = array.filter(function (item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    if (!excludeProps || excludeProps.indexOf(key) === -1) {
                        var thisVal = item[key];
                        if (
                        // Value is a string and NOT a UTC date
                        typeof thisVal === 'string' &&
                            !thisVal.match(isoDateRegex) &&
                            thisVal.toLowerCase().indexOf(lQuery) !== -1) {
                            return true;
                        }
                        else if (
                        // Value is a Date object or UTC string
                        (thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
                            // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
                            // Matching date format string passed in as param (or default to 'medium')
                            _this.datePipe.transform(thisVal, dateF).toLowerCase().indexOf(lQuery) !== -1) {
                            return true;
                        }
                    }
                }
            }
        });
        return filteredArray;
    };
    FilterSortService.prototype.noSearchResults = function (arr, query) {
        // Check if array searched by query returned any results
        return !!(!arr.length && query);
    };
    FilterSortService.prototype.orderByDate = function (array, prop, reverse) {
        // Order an array of objects by a date property
        // Default: ascending (1992->2017 | Jan->Dec)
        if (!prop || !this._objArrayCheck(array)) {
            return array;
        }
        var sortedArray = array.sort(function (a, b) {
            var dateA = new Date(a[prop]).getTime();
            var dateB = new Date(b[prop]).getTime();
            return !reverse ? dateA - dateB : dateB - dateA;
        });
        return sortedArray;
    };
    FilterSortService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]])
    ], FilterSortService);
    return FilterSortService;
}());



/***/ }),

/***/ "../../../../../src/app/core/forms/submitting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmittingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SubmittingComponent = (function () {
    function SubmittingComponent() {
    }
    SubmittingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-submitting',
            template: "\n    <img src=\"/assets/images/loading.svg\">\n  ",
            styles: ["\n    :host {\n      display: inline-block;\n    }\n    img {\n      display: inline-block;\n      margin: 4px 3px;\n      width: 30px;\n    }\n  "]
        })
    ], SubmittingComponent);
    return SubmittingComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    LoadingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-loading',
            template: "\n    <img src=\"/assets/images/loading.svg\">\n  ",
            styles: ["\n    :host {\n      display: block;\n    }\n    img {\n      display: block;\n      margin: 20px auto;\n      width: 50px;\n    }\n  "]
        })
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/utils.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilsService = (function () {
    function UtilsService(datePipe) {
        this.datePipe = datePipe;
    }
    UtilsService.prototype.isLoaded = function (loading) {
        return loading === false;
    };
    UtilsService.prototype.eventDates = function (start, end) {
        // Display single-day events as "Jan 7, 2018"
        // Display multi-day events as "Aug 12, 2017 - Aug 13, 2017"
        var startDate = this.datePipe.transform(start, 'mediumDate');
        var endDate = this.datePipe.transform(end, 'mediumDate');
        if (startDate === endDate) {
            return startDate;
        }
        else {
            return startDate + " - " + endDate;
        }
    };
    UtilsService.prototype.eventDatesTimes = function (start, end) {
        // Display single-day events as "1/7/2018, 5:30 PM - 7:30 PM"
        // Display multi-day events as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
        var startDate = this.datePipe.transform(start, 'shortDate');
        var startTime = this.datePipe.transform(start, 'shortTime');
        var endDate = this.datePipe.transform(end, 'shortDate');
        var endTime = this.datePipe.transform(end, 'shortTime');
        if (startDate === endDate) {
            return startDate + ", " + startTime + " - " + endTime;
        }
        else {
            return startDate + ", " + startTime + " - " + endDate + ", " + endTime;
        }
    };
    UtilsService.prototype.eventPast = function (eventEnd) {
        // Check if event has already ended
        var now = new Date();
        var then = new Date(eventEnd.toString());
        return now >= then;
    };
    UtilsService.prototype.tabIs = function (currentTab, tab) {
        // Check if current tab is tab name
        return currentTab === tab;
    };
    UtilsService.prototype.displayCount = function (guests) {
        // Example usage:
        // {{displayCount(guests)}} attending this event
        var persons = guests === 1 ? ' person' : ' people';
        return guests + persons;
    };
    UtilsService.prototype.showPlusOnes = function (guests) {
        // If bringing additional guest(s), show as "+n"
        if (guests) {
            return "+" + guests;
        }
    };
    UtilsService.prototype.booleanToText = function (bool) {
        // Change a boolean to 'Yes' or 'No' string
        return bool ? 'Yes' : 'No';
    };
    UtilsService.prototype.capitalize = function (str) {
        // Capitalize first letter of string
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    UtilsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]])
    ], UtilsService);
    return UtilsService;
}());



/***/ }),

/***/ "../../../../../src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<p class=\"text-center\">\n  MIT 2017\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n       FOOTER\n--------------------*/\n:host {\n  display: block;\n  padding-bottom: 10px; }\n\np {\n  font-size: 12px;\n  margin-bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
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

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"header\" class=\"header\">\n  <div class=\"header-page bg-primary\">\n    <a class=\"toggle-offcanvas bg-primary\" (click)=\"toggleNav()\"><span></span></a>\n    <h1 class=\"header-page-siteTitle\">\n      <a routerLink=\"/\">RSVP</a>\n    </h1>\n    <div class=\"header-page-authStatus\">\n      <a *ngIf=\"!auth.loggedIn\" (click)=\"auth.login()\">Log In</a>\n      <span *ngIf=\"auth.loggedIn\">\n        <a routerLink=\"/my-rsvps\">{{auth.userProfile?.name}}</a>\n        <span class=\"opacity-half\">|</span>\n        <a (click)=\"auth.logout()\">Log Out</a>\n      </span>\n    </div>\n  </div>\n\n  <nav id=\"nav\" class=\"nav\" role=\"navigation\">\n    <ul class=\"nav-list\">\n      <li>\n        <a\n          routerLink=\"/\"\n          routerLinkActive=\"active\"\n          [routerLinkActiveOptions]=\"{ exact: true }\">Events</a>\n      </li>\n      <li>\n        <a\n          *ngIf=\"auth.loggedIn\"\n          routerLink=\"/my-rsvps\"\n          routerLinkActive=\"active\">My RSVPs</a>\n      </li>\n      <li>\n        <a\n          *ngIf=\"auth.loggedIn && auth.isAdmin\"\n          routerLink=\"/admin\"\n          routerLinkActive=\"active\"\n          [routerLinkActiveOptions]=\"{ exact: true }\">Admin</a>\n      </li>\n      <li>\n        <a\n          *ngIf=\"auth.loggedIn && auth.isAdmin\"\n          routerLink=\"/admin/event/new\"\n          routerLinkActive=\"active\">Create Event</a>\n      </li>\n    </ul>\n  </nav>\n</header>\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--------------------\n       HEADER\n--------------------*/\n/*--------------------\n   LAYOUT VARIABLES\n--------------------*/\n/*-- Navigation --*/\n.nav {\n  background: #eee;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  box-shadow: inset -8px 0 8px -6px rgba(0, 0, 0, 0.2);\n  display: none;\n  /* deal with FOUC */\n  height: 100%;\n  overflow-y: auto;\n  padding: 3%;\n  position: absolute;\n  top: 0;\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n  width: 270px; }\n  :host-context(.nav-closed) .nav,\n  :host-context(.nav-open) .nav {\n    display: block;\n    /* deal with FOUC */ }\n  .nav .active {\n    font-weight: bold; }\n  .nav-list {\n    list-style: none;\n    margin-bottom: 0;\n    padding-left: 0; }\n    .nav-list a {\n      display: block;\n      padding: 6px; }\n      .nav-list a:hover, .nav-list a:active, .nav-list a:focus {\n        text-decoration: none; }\n\n/*-- Hamburger toggle --*/\n.toggle-offcanvas {\n  border-right: 1px solid rgba(255, 255, 255, 0.5);\n  display: inline-block;\n  height: 50px;\n  padding: 23.5px 13px;\n  position: relative;\n  text-align: center;\n  width: 50px;\n  z-index: 100; }\n  .toggle-offcanvas span,\n  .toggle-offcanvas span:before,\n  .toggle-offcanvas span:after {\n    background: #fff;\n    border-radius: 1px;\n    content: '';\n    display: block;\n    height: 3px;\n    position: absolute;\n    transition: all 250ms ease-in-out;\n    width: 24px; }\n  .toggle-offcanvas span:before {\n    top: -9px; }\n  .toggle-offcanvas span:after {\n    bottom: -9px; }\n  :host-context(.nav-open) .toggle-offcanvas span {\n    background: transparent; }\n    :host-context(.nav-open) .toggle-offcanvas span:before, :host-context(.nav-open) .toggle-offcanvas span:after {\n      top: 0; }\n    :host-context(.nav-open) .toggle-offcanvas span:before {\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg); }\n    :host-context(.nav-open) .toggle-offcanvas span:after {\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg); }\n\n/*-- Header and title --*/\n.header-page {\n  color: #fff;\n  height: 50px;\n  margin-bottom: 10px;\n  position: relative; }\n  .header-page-siteTitle {\n    font-size: 30px;\n    line-height: 50px;\n    margin: 0;\n    padding: 0 0 0 60px;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .header-page a {\n    color: #fff;\n    text-decoration: none; }\n  .header-page-authStatus {\n    color: #fff;\n    font-size: 12px;\n    line-height: 50px;\n    padding: 0 10px;\n    position: absolute;\n    right: 0;\n    top: 0; }\n    .header-page-authStatus a:hover {\n      text-decoration: underline; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/filter.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = (function () {
    function HeaderComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.navToggled = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.navOpen = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // If nav is open after routing, close it
        this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */] && _this.navOpen; })
            .subscribe(function (event) { return _this.toggleNav(); });
    };
    HeaderComponent.prototype.toggleNav = function () {
        this.navOpen = !this.navOpen;
        this.navToggled.emit(this.navOpen);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "navToggled", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/callback/callback.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading></app-loading>\n"

/***/ }),

/***/ "../../../../../src/app/pages/callback/callback.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/callback/callback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallbackComponent; });
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

var CallbackComponent = (function () {
    function CallbackComponent() {
    }
    CallbackComponent.prototype.ngOnInit = function () {
    };
    CallbackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-callback',
            template: __webpack_require__("../../../../../src/app/pages/callback/callback.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/callback/callback.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CallbackComponent);
    return CallbackComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">{{pageTitle}}</h1>\n<app-loading *ngIf=\"loading\"></app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <ng-template [ngIf]=\"eventList\">\n    <ng-template [ngIf]=\"eventList.length\">\n      <!-- Search events -->\n      <section class=\"search input-group mb-3\">\n        <label class=\"input-group-addon\" for=\"search\">Search</label>\n        <input\n          id=\"search\"\n          type=\"text\"\n          class=\"form-control\"\n          [(ngModel)]=\"query\"\n          (keyup)=\"searchEvents()\" />\n        <span class=\"input-group-btn\">\n          <button\n            class=\"btn btn-danger\"\n            (click)=\"resetQuery()\"\n            [disabled]=\"!query\">&times;</button>\n        </span>\n      </section>\n\n      <!-- No search results -->\n      <p *ngIf=\"fs.noSearchResults(filteredEvents, query)\" class=\"alert alert-warning\">\n        No events found for <em class=\"text-danger\">{{query}}</em>, sorry!\n      </p>\n\n      <!-- Events listing -->\n      <section class=\"list-group\">\n        <a\n          *ngFor=\"let event of fs.orderByDate(filteredEvents, 'startDatetime')\"\n          [routerLink]=\"['/event', event._id]\"\n          class=\"list-group-item list-group-item-action flex-column align-items-start\">\n          <div class=\"d-flex w-100 justify-content-between\">\n            <h5 class=\"mb-1\" [innerHTML]=\"event.title\"></h5>\n            <small>{{utils.eventDates(event.startDatetime, event.endDatetime)}}</small>\n          </div>\n        </a>\n      </section>\n    </ng-template>\n\n    <!-- No upcoming public events available -->\n    <p *ngIf=\"!eventList.length\" class=\"alert alert-info\">\n      No upcoming public events available.\n    </p>\n  </ng-template>\n\n  <!-- Error loading events -->\n  <p *ngIf=\"error\" class=\"alert alert-danger\">\n    <strong>Oops!</strong> There was an error retrieving event data.\n  </p>\n\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_filter_sort_service__ = __webpack_require__("../../../../../src/app/core/filter-sort.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = (function () {
    function HomeComponent(title, utils, api, fs) {
        this.title = title;
        this.utils = utils;
        this.api = api;
        this.fs = fs;
        this.pageTitle = 'Events';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.title.setTitle(this.pageTitle);
        this._getEventList();
    };
    HomeComponent.prototype._getEventList = function () {
        var _this = this;
        this.loading = true;
        // Get future, public events
        this.eventListSub = this.api
            .getEvents$()
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
    HomeComponent.prototype.searchEvents = function () {
        this.filteredEvents = this.fs.search(this.eventList, this.query, '_id', 'mediumDate');
    };
    HomeComponent.prototype.resetQuery = function () {
        this.query = '';
        this.filteredEvents = this.eventList;
    };
    Object.defineProperty(HomeComponent.prototype, "noSearchResults", {
        get: function () {
            return !!(!this.filteredEvents.length && this.query);
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.ngOnDestroy = function () {
        this.eventListSub.unsubscribe();
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/pages/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */],
            __WEBPACK_IMPORTED_MODULE_3__core_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_2__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__core_filter_sort_service__["a" /* FilterSortService */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/my-rsvps/my-rsvps.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">{{pageTitle}}</h1>\n<p class=\"lead\" *ngIf=\"auth.loggedIn\">\n  Hello, <strong [innerHTML]=\"auth.userProfile.name\"></strong>! You logged in with {{userIdp}}.\n  <ng-template [ngIf]=\"auth.isAdmin\">\n    You may <a routerLink=\"/admin\">create and administer events</a>.\n  </ng-template>\n</p>\n\n<app-loading *ngIf=\"loading\"></app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <ng-template [ngIf]=\"eventList\">\n    <!-- Event list retrieved but no RSVPs yet -->\n    <p *ngIf=\"!eventList.length\" class=\"lead\">\n      You have not RSVPed to any events yet. Check out the <a routerLink=\"/\">homepage</a> to see a list of upcoming events.\n    </p>\n\n    <ng-template [ngIf]=\"eventList.length\">\n      <p class=\"lead\">You have <strong>RSVPed</strong> for the following upcoming events:</p>\n\n      <!-- Events listing -->\n      <div class=\"list-group\">\n        <a\n          *ngFor=\"let event of fs.orderByDate(eventList, 'startDatetime')\"\n          [routerLink]=\"['/event', event._id]\"\n          [queryParams]=\"{tab: 'rsvp'}\"\n          class=\"list-group-item list-group-item-action flex-column align-items-start\">\n          <div class=\"d-flex w-100 justify-content-between\">\n            <h5 class=\"mb-1\" [innerHTML]=\"event.title\"></h5>\n            <small>{{utils.eventDates(event.startDatetime, event.endDatetime)}}</small>\n          </div>\n          <small class=\"mb-1\">Click to view or update this RSVP</small>\n        </a>\n      </div>\n    </ng-template>\n  </ng-template>\n\n  <!-- Error loading events -->\n  <p *ngIf=\"error\" class=\"alert alert-danger\">\n    <strong>Oops!</strong> There was an error getting your RSVP data.\n  </p>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/my-rsvps/my-rsvps.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/my-rsvps/my-rsvps.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyRsvpsComponent; });
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






var MyRsvpsComponent = (function () {
    function MyRsvpsComponent(title, auth, api, fs, utils) {
        this.title = title;
        this.auth = auth;
        this.api = api;
        this.fs = fs;
        this.utils = utils;
        this.pageTitle = 'My RSVPs';
    }
    MyRsvpsComponent.prototype.ngOnInit = function () {
        this.title.setTitle(this.pageTitle);
        this.userIdp = this._getIdp;
        this._getEventList();
    };
    MyRsvpsComponent.prototype._getEventList = function () {
        var _this = this;
        this.loading = true;
        // Get events user has RSVPed to
        this.eventListSub = this.api
            .getUserEvents$(this.auth.userProfile.sub)
            .subscribe(function (res) {
            _this.eventList = res;
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
        });
    };
    Object.defineProperty(MyRsvpsComponent.prototype, "_getIdp", {
        get: function () {
            var sub = this.auth.userProfile.sub.split('|')[0];
            var idp = sub;
            if (sub === 'auth0') {
                idp = 'Username/Password';
            }
            else if (idp === 'google-oauth2') {
                idp = 'Google';
            }
            else {
                idp = this.utils.capitalize(sub);
            }
            return idp;
        },
        enumerable: true,
        configurable: true
    });
    MyRsvpsComponent.prototype.ngOnDestroy = function () {
        this.eventListSub.unsubscribe();
    };
    MyRsvpsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-my-rsvps',
            template: __webpack_require__("../../../../../src/app/pages/my-rsvps/my-rsvps.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/my-rsvps/my-rsvps.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* Title */],
            __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_5__core_filter_sort_service__["a" /* FilterSortService */],
            __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */]])
    ], MyRsvpsComponent);
    return MyRsvpsComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map