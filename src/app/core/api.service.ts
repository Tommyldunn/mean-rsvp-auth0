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
    return this.authHttp
      .get(`${ENV.BASE_API}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  getAuthorized$(): Observable<any> {
    return this.authHttp
      .get(`${ENV.BASE_API}authorized`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  getAdmin$(): Observable<any> {
    return this.authHttp
      .get(`${ENV.BASE_API}admin`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  private handleSuccess(res: Response) {
    console.log(res);
    return res;
    //return res.json();
  }

  private handleError(err: Response | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return Observable.throw(errorMsg);
  }

}
