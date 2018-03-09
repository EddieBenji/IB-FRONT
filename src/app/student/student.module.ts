import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentSearcherComponent } from './student-searcher/student-searcher.component';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { StudentComponent } from './student.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentService } from './student.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ],
  declarations: [
    StudentComponent,
    StudentModalComponent,
    StudentSearcherComponent,
    StudentTableComponent
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule {
}
