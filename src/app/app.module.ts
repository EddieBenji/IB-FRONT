import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './utils/confirmation-modal/confirmation-modal.component';
import { BethelEmitter } from './utils/bethel.emitter';
import { LoopForNumberPipe } from './utils/loop-for-number.pipe';
import { PaginationFooterComponent } from './utils/pagination-footer/pagination-footer.component';
import { PaginationService } from './utils/pagination-footer/pagination.service';
import { NotificationComponent } from './utils/notification/notification.component';
import { NotificationService } from './utils/notification/notification.service';
import { SimpleDropDownEmitter } from './utils/simple-drop-down/simple-drop-down.emitter';
import { SimpleDropDownComponent } from './utils/simple-drop-down/simple-drop-down.component';
import { GeneralService } from './utils/general.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth/auth.service';
import { reducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent,
    LoopForNumberPipe,
    PaginationFooterComponent,
    NotificationComponent,
    SimpleDropDownComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AuthModule,
    SharedModule,
    CoreModule,
    // NGRX:
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    GeneralService,
    BethelEmitter,
    PaginationService,
    SimpleDropDownEmitter,
    NotificationService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
