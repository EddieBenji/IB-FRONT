import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BethelInstituteRouting } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentComponent } from './student/student.component';
import { ConfirmationModalComponent } from './utils/confirmation-modal/confirmation-modal.component';
import { BethelEmitter } from './utils/bethel.emitter';
import { LoopForNumberPipe } from './utils/loop-for-number.pipe';
import { PaginationFooterComponent } from './utils/pagination-footer/pagination-footer.component';
import { PaginationService } from './utils/pagination-footer/pagination.service';
import { NotificationComponent } from './utils/notification/notification.component';
import { NotificationService } from './utils/notification/notification.service';
import { SimpleDropDownEmitter } from './utils/confirmation-modal/simple-drop-down/simple-drop-down.emitter';
import { SimpleDropDownComponent } from './utils/confirmation-modal/simple-drop-down/simple-drop-down.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentComponent,
    ConfirmationModalComponent,
    LoopForNumberPipe,
    PaginationFooterComponent,
    NotificationComponent,
    SimpleDropDownComponent
  ],
  imports: [
    BrowserModule,
    BethelInstituteRouting,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [
    BethelEmitter,
    PaginationService,
    NotificationService,
    SimpleDropDownEmitter
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
