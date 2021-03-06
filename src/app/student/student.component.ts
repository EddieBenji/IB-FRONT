import { Component, OnInit } from '@angular/core';
import { SearchStudent } from './student-searcher/search-student.model';
import { StudentService } from './student.service';
import { StudentResponse } from './student-table/student-response.model';
import { BethelEmitter } from '../utils/bethel.emitter';
import { ResponseConfirmationModalModel } from '../utils/confirmation-modal/response-confirmation-modal.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public searcher: SearchStudent;
  public students: StudentResponse[];
  public isLoading: boolean;

  // For student modal:
  studentSelected: StudentResponse;
  displayModal = 'none';
  isEditing = false;

  SECTION_ID = 'students';

  constructor(
    private studentService: StudentService,
    private bethelEmitter: BethelEmitter
  ) {}

  ngOnInit() {
    this.searcher = new SearchStudent();
    this.fetchStudents();
    this.bethelEmitter.closeConfirmationModal.subscribe(
      (answer: ResponseConfirmationModalModel) => {
        if (answer.opId !== this.SECTION_ID || !answer.response) {
          return;
        }
        this.studentService
          .deleteStudent(this.studentSelected)
          .subscribe(response => this.fetchStudents());
      }
    );
  }

  private fetchStudents() {
    this.isLoading = true;
    this.students = [];
    this.studentService
      .searchForStudents(this.searcher)
      .subscribe((response: StudentResponse[]) => {
        this.students = response;
        this.isLoading = false;
        this.displayModal = 'none';
        this.studentSelected = null;
      });
  }

  searchForStudents() {
    this.fetchStudents();
  }

  selectStudent(infoStudent: {
    student: StudentResponse;
    permitToEdit: boolean;
  }) {
    this.studentSelected = infoStudent.student
      ? infoStudent.student
      : new StudentResponse();
    this.isEditing = infoStudent.permitToEdit;
    this.displayModal = 'block';
  }

  onCloseStudentModal(reload: boolean) {
    this.studentSelected = null;
    this.isEditing = false;
    this.displayModal = 'none';
    if (reload) {
      this.fetchStudents();
    }
  }

  deleteStudent(student: StudentResponse) {
    this.bethelEmitter.handleConfirmationModal(
      'Eliminar estudiante',
      '¿Seguro que deseas eliminar el estudiante seleccionado?',
      this.SECTION_ID
    );
    this.studentSelected = student;
  }
}
