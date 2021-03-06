import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentResponse } from './student-response.model';
import { PaginationService } from '../../utils/pagination-footer/pagination.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: [ './student-table.component.css' ]
})
export class StudentTableComponent implements OnInit {
  @Input() public students: StudentResponse[];
  @Output() public onStudentSelect = new EventEmitter<{ student: StudentResponse, permitToEdit: boolean }>();
  @Output() public onStudentDelete = new EventEmitter<StudentResponse>();

  constructor(public paginationService: PaginationService) {
  }

  ngOnInit() {
  }

  selectStudent(student: StudentResponse, permitToEdit: boolean) {
    this.onStudentSelect.emit({ student: student, permitToEdit: permitToEdit });
  }

  deleteStudent(student: StudentResponse) {
    this.onStudentDelete.emit(student);
  }

}
