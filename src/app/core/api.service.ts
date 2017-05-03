import { Injectable } from '@angular/core';
import { ENV } from './env.config';
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor(private http: Http, private authHttp: AuthHttp) { }

  getEvents$(): Observable<any[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  getAuthorized$(): Observable<any> {
    return this.authHttp
      .get(`${ENV.BASE_API}authorized`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  getAdmin$(): Observable<any> {
    return this.authHttp
      .get(`${ENV.BASE_API}admin`)
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
