import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    CoreModule
  ],
  providers: [
    GeneralService,
    BethelEmitter,
    PaginationService,
    SimpleDropDownEmitter,
    NotificationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
