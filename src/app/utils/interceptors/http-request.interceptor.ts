import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';

import { AppState, getToken } from '../../app.reducer';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login')) {
      // No need of adding the authorization header.
      const copiedReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
      return next.handle(copiedReq);
    }
    return this.store.select(getToken)
      .switchMap((token: string) => {
        let headers = req.headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', token);
        const copiedReq = req.clone({
          headers: headers
        });
        return next.handle(copiedReq);
      })
  }
}
