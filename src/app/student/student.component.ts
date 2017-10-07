import { Component, OnInit } from '@angular/core';
import { SearchStudent } from './search-student.model';
import { StudentService } from './student.service';
import { StudentResponse } from './student-response.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [ './student.component.css' ]
})
export class StudentComponent implements OnInit {
  public searcher: SearchStudent;
  public students: StudentResponse[];
  public isLoading: boolean;

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.searcher = new SearchStudent;
  }

  searchForStudents() {
    this.isLoading = true;
    this.studentService.searchForStudents(this.searcher).subscribe(
      (response: StudentResponse[]) => {
        this.students = response;
        this.isLoading = false;
      }
    );
  }

}
