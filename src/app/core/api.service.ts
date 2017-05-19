import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { ENV } from './env.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private auth: AuthService) { }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}events/admin`)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // GET an event by ID (login required)
  getEventById$(id): Observable<EventModel> {
    return this.authHttp
      .get(`${ENV.BASE_API}event/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId): Observable<RsvpModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}event/${eventId}/rsvps`)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // POST new event (admin only)
  postEvent$(event): Observable<EventModel> {
    return this.authHttp
      .post(`${ENV.BASE_API}event/new`, event)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // PUT existing event (admin only)
  editEvent$(id, event): Observable<EventModel> {
    return this.authHttp
      .put(`${ENV.BASE_API}event/${id}`, event)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id): Observable<any> {
    return this.authHttp
      .delete(`${ENV.BASE_API}event/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // GET all events a specific user has RSVPed to (login required)
  getUserEvents$(userId): Observable<RsvpModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}events/${userId}`)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // POST new RSVP (login required)
  postRsvp$(rsvp): Observable<RsvpModel> {
    return this.authHttp
      .post(`${ENV.BASE_API}rsvp/new`, rsvp)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  // PUT existing RSVP (login required)
  editRsvp$(id, rsvp): Observable<RsvpModel> {
    return this.authHttp
      .put(`${ENV.BASE_API}rsvp/${id}`, rsvp)
      .map(this._handleSuccess)
      .catch(this._handleAuthError);
  }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }

  private _handleAuthError(err: Response | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    // If access token is expired, prompt to log in
    if (!this.auth.authenticated) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

}
