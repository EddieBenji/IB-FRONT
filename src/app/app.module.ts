import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

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
import { SimpleDropDownEmitter } from './utils/simple-drop-down/simple-drop-down.emitter';
import { SimpleDropDownComponent } from './utils/simple-drop-down/simple-drop-down.component';
import { GeneralService } from './utils/general.service';
import { StudentService } from './student/student.service';
import { StudentModalComponent } from './student/student-modal/student-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentSearcherComponent } from './student/student-searcher/student-searcher.component';
import { StudentTableComponent } from './student/student-table/student-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentComponent,
    ConfirmationModalComponent,
    LoopForNumberPipe,
    PaginationFooterComponent,
    NotificationComponent,
    SimpleDropDownComponent,
    StudentModalComponent,
    StudentSearcherComponent,
    StudentTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BethelInstituteRouting,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    GeneralService,
    BethelEmitter,
    PaginationService,
    SimpleDropDownEmitter,
    StudentService,
    NotificationService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
