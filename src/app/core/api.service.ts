import { Injectable } from '@angular/core';
import { ENV } from './env.config';
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp) { }

  // GET list of public events (no RSVPs)
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET an event by ID (with RSVPs)
  getEventById$(id): Observable<EventModel> {
    return this.authHttp
      .get(`${ENV.BASE_API}event/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET all events (private and public) with all RSVPs (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}events/admin`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET all RSVPs for a specific user
  getUserRsvps$(userId): Observable<RsvpModel[]> {
    return this.authHttp
      .get(`${ENV.BASE_API}rsvps/${userId}`)
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
