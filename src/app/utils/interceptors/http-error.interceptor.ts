import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

import { NotificationService } from '../notification/notification.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {
  }

  protected handleError = function (errorObj: HttpErrorResponse) {
    // This fix is because angular 5 manages the error as HttpErrorResponse object.
    const error = errorObj.error ? errorObj.error : errorObj;
    const errMsg = error.message ? error.message :
      (errorObj.status && errorObj.statusText) ? `${errorObj.status} - ${errorObj.statusText}` : 'Server error';
    this.notificationService.handleErrorNotification(errMsg);
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        if (event instanceof HttpResponse && event.body && event.body.message) {
          this.notificationService.handleSuccessNotification(event.body.message)
        }
      }
    ).catch((err: HttpErrorResponse) => {
      this.handleError(err);
      // ...optionally return a default fallback value so app can continue (pick one)
      // which could be a default value (which has to be a HttpResponse here)
      // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
      // or simply an empty observable
      return Observable.throw(new HttpErrorResponse({
        error: err.error,
        statusText: err.message,
        status: err.status
      }));
    });
  }
}
