import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(copiedReq);
  }
}
