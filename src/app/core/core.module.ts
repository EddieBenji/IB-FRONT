import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { HttpRequestInterceptor } from '../utils/interceptors/http-request.interceptor';
import { HttpResponseInterceptor } from '../utils/interceptors/http-error.interceptor';

@NgModule({
  declarations: [ HomePageComponent ],
  imports: [ AppRoutingModule ],
  exports: [ AppRoutingModule, HomePageComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true }
  ]
})
export class CoreModule {
}
