import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
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
    private authHttp: AuthHttp) { }

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
      .catch(this._handleError);
  }

  // GET an event by ID (login required)
  getEventById$(id): Observable<EventModel> {
    return this.authHttp
      .get(`${ENV.BASE_API}event/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(id): Observable<RsvpModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}event/${id}/rsvps`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // POST new event (admin only)
  postEvent$(event): Observable<EventModel> {
    return this.authHttp
      .post(`${ENV.BASE_API}event/new`, event)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // PUT existing event (admin only)
  editEvent$(id, event): Observable<EventModel> {
    return this.authHttp
      .put(`${ENV.BASE_API}event/${id}`, event)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id): Observable<any> {
    return this.authHttp
      .delete(`${ENV.BASE_API}event/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET all RSVPs for a specific user (login required)
  getUserRsvps$(userId): Observable<RsvpModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}rsvps/${userId}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // POST new RSVP (login required)
  postRsvp$(rsvp): Observable<RsvpModel> {
    return this.authHttp
      .post(`${ENV.BASE_API}rsvp/new`, rsvp)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // PUT existing RSVP (login required)
  editRsvp$(id, rsvp): Observable<RsvpModel> {
    return this.authHttp
      .put(`${ENV.BASE_API}rsvp/${id}`, rsvp)
      .map(this._handleSuccess)
      .catch(this._handleError);
    }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return Observable.throw(errorMsg);
  }

}
