import { Component, OnInit } from '@angular/core';
import { SearchStudent } from './search-student.model';
import { StudentService } from './student.service';
import { StudentResponse } from './student-response.model';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [ './student.component.css' ]
})
export class StudentComponent implements OnInit {
  public searcher: SearchStudent;
  public students: StudentResponse[];
  public isLoading: boolean;

  // For student modal:
  studentSelected: StudentResponse;
  displayModal = 'none';
  isEditing = false;

  constructor(private studentService: StudentService, private notifService: NotificationService) {
  }

  ngOnInit() {
    this.searcher = new SearchStudent;
  }

  private fetchStudents() {
    this.isLoading = true;
    this.students = [];
    this.studentService.searchForStudents(this.searcher).subscribe(
      (response: StudentResponse[]) => {
        this.students = response;
        this.isLoading = false;
        this.displayModal = 'none';
        this.studentSelected = null;
      }
    );
  }

  searchForStudents() {
    this.fetchStudents();
  }

  selectStudent(student: StudentResponse, willEdit: boolean) {
    this.studentSelected = student;
    this.isEditing = willEdit;
    this.displayModal = 'block';
  }

  onCloseStudentModal() {
    this.studentSelected = null;
    this.isEditing = false;
    this.displayModal = 'none';
    this.searcher = new SearchStudent;
    this.fetchStudents();
  }

}
